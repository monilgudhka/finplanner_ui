import { Component, Input } from '@angular/core';
import { Growth } from 'src/app/shared/model/growth.model';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html'
})
export class SummaryComponent {
    @Input('growth') growth: Growth;
}