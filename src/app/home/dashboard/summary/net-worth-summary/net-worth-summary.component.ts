import { Component, Input } from '@angular/core';
import { Growth } from 'src/app/shared/model/growth.model';

@Component({
    selector: 'app-net-worth-summary',
    templateUrl: './net-worth-summary.component.html'
})
export class NetWorthSummaryComponent {
    @Input('growth') growth: Growth;
}