import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'app-number-question',
    templateUrl: './number-question.component.html',
    styleUrls: ['./number-question.component.scss']
})
export class NumberQuestionComponent {
    isInvalid: boolean;

    @Input() itemsName: string;
    @Input() heading: string;

    @Input() quantity: number;
    @Output() quantityChange = new EventEmitter<number>();

    increaseQuantity(amount: number): void {
        this.quantity += amount;
        this.updateQuantity();
    }

    updateQuantity() {
        if (this.quantity >= 1) {
            this.isInvalid = false;
            this.quantityChange.emit(this.quantity);
        } else {
            this.isInvalid = true;
            this.quantityChange.emit(undefined);
        }
    }
}