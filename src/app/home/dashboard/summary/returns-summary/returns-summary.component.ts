import { Component, Input } from '@angular/core';
import { Growth } from 'src/app/shared/model/growth.model';

@Component({
    selector: 'app-returns-summary',
    templateUrl: './returns-summary.component.html'
})
export class ReturnsSummaryComponent {
    @Input('growth') growth: Growth;
}