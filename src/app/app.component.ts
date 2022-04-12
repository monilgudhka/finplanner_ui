import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { InvestmentsService } from './shared/service/investments.service';
import { MembersService } from './shared/service/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private membersService: MembersService,
    private investmentsService: InvestmentsService
  ) { }

  ngOnInit(): void {
    this.investmentsService.init();
    this.membersService.init();
    this.authService.init();
  }

  ngOnDestroy(): void {
    this.investmentsService.destroy();
    this.membersService.destroy();
    this.authService.destroy();
  }
}
