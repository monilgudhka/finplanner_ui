import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/shared/model/member.model';
import { MembersService } from 'src/app/shared/service/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit, OnDestroy {
  memberList: Array<Member> = [];
  failure: boolean = false;

  private membersSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private membersService: MembersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.errorSubscription = this.membersService.subscribeError(error => this.onFailure(error));
    this.membersSubscription = this.membersService.subscribeMembers(members => {
      this.memberList = members;
    });
    this.memberList = this.membersService.getMembers();
  }

  private onFailure(error: HttpErrorResponse) {
    this.snackBar.open(error.error, 'Dismiss', {
      duration: 5000
    });
    this.failure = true;
  }

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
