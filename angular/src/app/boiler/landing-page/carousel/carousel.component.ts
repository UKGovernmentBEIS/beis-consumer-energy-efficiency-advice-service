import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    carouselItems: {summary: string, details: string}[];
    currentItem: number;

    ngOnInit() {
        this.carouselItems = [
            {
                summary: 'Double check the basics',
                details: 'First of all, if you have a prepayment meter, check that you\'ve got enough credit. Next, test whether your other gas appliances, like you cooker hob, are working correctly, or whether the switches in your fuse box have tripped.',
            },
            {
                summary: 'Think back to if you\'ve had a power cut recently',
                details: 'If you have, your boiler\'s timer might have reset - which means getting it working again could be as simple as re-programming it with your times. Take a look at its instruction manual for a reminder on how to do this.',
            },
            {
                summary: 'Check your boiler\'s pressure gauge',
                details: 'If it\'s showing a reading of one bar or less, low pressure could be the reason why your boiler\'s not working. Topping up the pressure yourself is usually straightforward - follow the steps in your boiler\'s manual or watch our how-to video.',
            },
            {
                summary: 'Double check the basics',
                details: 'First of all, if you have a prepayment meter, check that you\'ve got enough credit. Next, test whether your other gas appliances, like you cooker hob, are working correctly, or whether the switches in your fuse box have tripped.',
            },
            {
                summary: 'Think back to if you\'ve had a power cut recently',
                details: 'If you have, your boiler\'s timer might have reset - which means getting it working again could be as simple as re-programming it with your times. Take a look at its instruction manual for a reminder on how to do this.',
            },
        ];
        this.currentItem = 0;
    }

    canScrollForwards(): boolean {
        return this.currentItem < this.carouselItems.length - 3;
    }

    canScrollBackwards(): boolean {
        return this.currentItem > 0;
    }

    scrollForwards() {
        if (this.canScrollForwards()) {
            this.currentItem++;
        }
    }

    scrollBackwards() {
        if (this.canScrollBackwards()) {
            this.currentItem--;
        }
    }
}
