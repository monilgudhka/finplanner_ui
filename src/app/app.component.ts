import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { GrowthHistoryService } from './shared/service/growth-history.service';
import { InvestmentsService } from './shared/service/investments.service';
import { MembersService } from './shared/service/members.service';
import { ResourceService } from './shared/service/resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private membersService: MembersService,
    private investmentsService: InvestmentsService,
    private resourceService: ResourceService,
    private growthHistoryService: GrowthHistoryService
  ) { }

  ngOnInit(): void {
    this.investmentsService.init();
    this.membersService.init();
    this.growthHistoryService.init();
    this.authService.init();
    this.resourceService.init();
  }

  ngOnDestroy(): void {
    this.investmentsService.destroy();
    this.membersService.destroy();
    this.growthHistoryService.destroy();
    this.authService.destroy();
  }
}
