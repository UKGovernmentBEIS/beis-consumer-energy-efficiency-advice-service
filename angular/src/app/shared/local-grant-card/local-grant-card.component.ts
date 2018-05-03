import {Component, Input} from '@angular/core';
import {LocalAuthorityGrant} from "../../grants/model/local-authority-grant";

@Component({
    selector: 'app-local-grant-card',
    templateUrl: './local-grant-card.component.html',
    styleUrls: ['./local-grant-card.component.scss']
})
export class LocalGrantCardComponent {
    @Input() grant: LocalAuthorityGrant;
}
