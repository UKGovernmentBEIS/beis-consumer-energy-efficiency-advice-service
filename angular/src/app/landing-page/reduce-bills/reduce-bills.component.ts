import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-reduce-bills',
    templateUrl: './reduce-bills.component.html',
    styleUrls: ['./reduce-bills.component.scss']
})
export class ReduceBillsComponent {
    reduceBillsJourneyType: UserJourneyType = UserJourneyType.ReduceEnergyBills;

    video: Video = {
        title: 'Help if you\'re having difficulty paying your energy bills',
        synopsis: `
            A step by step guide to what you can do if you’re having trouble paying your energy bills, including:
            <ul>
                <li>
                    Things you should do straight away if you’re behind with your bills and can’t afford them
                    (such as speaking to your energy supplier to arrange a new payment plan, getting debt advice, asking for emergency help)
                </li>
                <li>
                    Support schemes that could help reduce your energy bills, or make them easier to pay (such as Warm Home Discount,
                    Winter Fuel Payments, Cold Weather Payments, Fuel Direct)
                </li>
                <li>
                    Links to other places to get help and advice
                </li>
                <li>
                    Links to things you could do to save energy straight away, and stop your bills getting any bigger
                </li>
            </ul>`
    };

    articles: Article[] = [
        {
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Loft insulation is well worth considering because if there is little or no \
                existing insulation considerable savings can be made.',
            iconClassName: 'icon-lightbulb'
        },
        {
            title: 'What can I do if I don\'t have cavity walls or a loft?',
            summary: 'There is plenty you can do to improve the insulation in your home if you \
            don\'t have cavity walls or a loft space.',
            iconClassName: 'icon-switch'
        },
    ];
}
