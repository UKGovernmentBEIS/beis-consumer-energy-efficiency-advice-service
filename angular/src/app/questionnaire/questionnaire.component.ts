import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import * as log from 'loglevel';
import {ActivatedRoute} from '@angular/router';
import {QuestionDirective} from './question.directive';
import {QuestionTypeUtil} from './questions/question-type';
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from './base-question/question-base-component';
import {AllQuestionsContent} from '../shared/question-content/all-questions-content';
import {QuestionContent} from '../shared/question-content/question-content';
import {QuestionContentService} from '../shared/question-content/question-content.service';
import {Questionnaire} from './base-questionnaire/questionnaire';
import {QuestionnaireService} from './questionnaire.service';
import {Subscription} from 'rxjs/Subscription';
import {QuestionHeadingProcessor} from './question-heading-processor.service';
import {GoogleAnalyticsService} from '../shared/analytics/google-analytics.service';
import {UserStateService} from "../shared/user-state-service/user-state-service";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

    questionnaire: Questionnaire;
    isLoading: boolean;
    isError: boolean;
    currentQuestionIndex: number;
    allQuestionsContent: AllQuestionsContent;
    currentQuestionContent: QuestionContent;
    questionTypeIconClassName: string;
    shouldDisplayQuestionReason: boolean;

    @Input() questionnaireName: string;
    @Output() onQuestionnaireComplete = new EventEmitter<void>();

    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    private questionComponent: QuestionBaseComponent;
    private questionContentSubscription: Subscription;
    private onQuestionCompleteSubscription: Subscription;
    private currentQuestionId: string;

    constructor(private route: ActivatedRoute,
                private questionContentService: QuestionContentService,
                private questionnaireService: QuestionnaireService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetectorRef: ChangeDetectorRef,
                private questionHeadingProcessor: QuestionHeadingProcessor,
                private googleAnalyticsService: GoogleAnalyticsService,
                private userStateService: UserStateService) {
        this.currentQuestionIndex = 0;
        this.isLoading = true;
        this.isError = false;
    }

    ngOnInit() {
        this.questionnaire = this.questionnaireService.getQuestionnaireWithName(this.questionnaireName);
        if (!this.questionnaire) {
            this.displayErrorAndLogMessage(`No questionnaire "${ this.questionnaireName }"`);
        }
        if (this.questionnaire.getQuestions().length === 0) {
            log.warn(`Questionnaire "${ this.questionnaireName } is empty"`);
            this.onQuestionnaireComplete.emit();
        }
        this.questionContentSubscription = this.questionContentService.fetchQuestionsContent().subscribe(
            questionContent => this.onQuestionContentLoaded(questionContent),
            () => this.displayErrorAndLogMessage('Error when loading question content')
        );
        this.setCurrentIndexFromRouteParams();
    }

    ngOnDestroy() {
        if (this.questionContentSubscription && !this.questionContentSubscription.closed) {
            this.questionContentSubscription.unsubscribe();
        }
    }

    animateToQuestion(index) {
        this.recordQuestionAnswer();
        const direction = this.getAnimationDirection(index);
        this.currentQuestionIndex = index;
        this.renderQuestion(direction);
    }

    previousQuestionExists() {
        return this.questionnaire.getPreviousQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    nextQuestionExists() {
        return this.questionnaire.getNextQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    hasBeenAnswered() {
        return this.questionnaire.hasBeenAnswered(this.currentQuestionIndex);
    }

    canGoBack() {
        return this.previousQuestionExists();
    }

    canGoForwards() {
        return this.nextQuestionExists() && this.hasBeenAnswered();
    }

    goBackOneQuestion() {
        this.recordQuestionAnswer();
        const prevIndex = this.questionnaire.getPreviousQuestionIndex(this.currentQuestionIndex);
        if (prevIndex !== -1) {
            this.currentQuestionIndex = prevIndex;
            this.renderQuestion('left');
            this.userStateService.sendState(this.currentQuestionIndex);
        }
    }

    goForwardsOneQuestion() {
        const nextIndex = this.questionnaire.getNextQuestionIndex(this.currentQuestionIndex);
        if (nextIndex !== -1) {
            this.currentQuestionIndex = nextIndex;
            this.renderQuestion('right');
            this.userStateService.sendState(this.currentQuestionIndex);
        }
    }

    goForwards() {
        this.recordQuestionAnswer();
        if (this.nextQuestionExists()) {
            this.goForwardsOneQuestion();
        } else {
            this.onQuestionnaireComplete.emit();
        }
    }

    toggleQuestionReasonDisplay() {
        this.shouldDisplayQuestionReason = !this.shouldDisplayQuestionReason;
    }

    private onQuestionContentLoaded(questionContent: AllQuestionsContent) {
        this.isLoading = false;
        this.allQuestionsContent = questionContent;
        this.jumpToQuestion(this.currentQuestionIndex);
    }

    private jumpToQuestion(index) {
        this.currentQuestionIndex = index;
        this.renderQuestion('none');
    }

    private getAnimationDirection(index): SlideInFrom {
        if (index < this.currentQuestionIndex) {
            return 'left';
        } else if (index > this.currentQuestionIndex) {
            return 'right';
        } else {
            return 'none';
        }
    }

    private displayErrorAndLogMessage(err: any) {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private recordQuestionAnswer() {
        if (this.currentQuestionId && this.questionComponent) {
            this.googleAnalyticsService.recordQuestionAnswer(this.currentQuestionId, this.questionComponent.responseForAnalytics);
        }
    }

    private renderQuestion(slideInFrom: SlideInFrom) {
        const question = this.questionnaire.getQuestion(this.currentQuestionIndex);
        if (!!question) {
            this.questionTypeIconClassName = QuestionTypeUtil.getIconClassName(question.questionType);
            this.currentQuestionId = question.questionId;
            this.currentQuestionContent = Object.assign({}, this.allQuestionsContent[this.currentQuestionId]);
            if (!(this.currentQuestionContent && this.currentQuestionContent.questionHeading)) {
                this.displayErrorAndLogMessage(`Missing question content for question with id "${ this.currentQuestionId }"`);
                return;
            }

            this.currentQuestionContent.questionHeading =
                this.questionHeadingProcessor.replacePlaceholders(this.currentQuestionContent.questionHeading);

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(question.componentType);

            // Set the current question to slide out in the opposite direction. Manual change
            // detection must be triggered here or the change will not apply.
            if (this.questionComponent) {
                this.questionComponent.slideInOut = oppositeDirection(slideInFrom);
            }
            this.changeDetectorRef.detectChanges();
            if (!this.questionHost) {
                return;
            }

            // Instantiate the new question and slide in in from the given direction.
            this.questionHost.viewContainerRef.clear();
            const componentRef = this.questionHost.viewContainerRef.createComponent(componentFactory);
            this.questionComponent = componentRef.instance;
            this.questionComponent.slideInOut = slideInFrom;

            this.shouldDisplayQuestionReason = this.currentQuestionContent.autoOpenQuestionReason;
            this.googleAnalyticsService.recordPageView(question.questionId);

            // Subscribe to the question's completion event, and unsubscribe from the previous one.
            if (this.onQuestionCompleteSubscription !== undefined && !this.onQuestionCompleteSubscription.closed) {
                this.onQuestionCompleteSubscription.unsubscribe();
            }
            this.onQuestionCompleteSubscription = this.questionComponent.complete.subscribe((answer) => {
                this.goForwards();
            });
        }
    }

    private setCurrentIndexFromRouteParams() {
        return this.route.queryParamMap
            .subscribe(queryParams => {
                const indexOrNull = parseInt(queryParams.get('startingQuestion'), 10);
                if (indexOrNull) {
                    this.currentQuestionIndex = indexOrNull;
                }
                this.userStateService.sendState(this.currentQuestionIndex);
            });
    }
}
