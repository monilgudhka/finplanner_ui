import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssetTypeDto } from 'src/app/shared/dto/asset-type-dto.model';
import { NewInvestmentDto } from 'src/app/shared/dto/new-investment-dto.model';
import { Member } from 'src/app/shared/model/member.model';
import { InvestmentsService } from 'src/app/shared/service/investments.service';
import { MembersService } from 'src/app/shared/service/members.service';
import { ResourceService } from 'src/app/shared/service/resource.service';

@Component({
  selector: 'app-investment-new',
  templateUrl: './new-investment.component.html'
})
export class NewInvestmentComponent implements OnInit, OnDestroy {
  assetTypeList: Array<AssetTypeDto>;
  goalTermList: Array<string>;
  memberList: Array<Member>;

  newInvestmentForm: FormGroup;

  private membersSubscription: Subscription;
  private errorSubscription: Subscription;
  private investmentsSubscription: Subscription;

  constructor(
    private membersService: MembersService,
    private investmentsService: InvestmentsService,
    private resourceService: ResourceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.errorSubscription = this.investmentsService.subscribeError(error => this.onFailure(error));
    this.membersSubscription = this.membersService.subscribeMembers(members => this.memberList = members);
    this.investmentsSubscription = this.investmentsService.subscribeInvestments(investments => this.onAfterCreated())

    this.memberList = this.membersService.getMembers();
    this.goalTermList = this.resourceService.getAllGoalTerms();
    this.assetTypeList = this.resourceService.getAllAssetTypes();

    const firstMember = (this.memberList.length > 0) ? this.memberList[0].getId() : null;
    this.newInvestmentForm = new FormGroup({
      'member': new FormControl(firstMember),
      'assetType': new FormControl(this.assetTypeList[0].name),
      'goalTerm': new FormControl(this.goalTermList[0]),
      'title': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.investmentsSubscription.unsubscribe();
    this.membersSubscription.unsubscribe();
  }

  private onAfterCreated() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private onFailure(error: HttpErrorResponse) {
    this.snackBar.open(error.error, 'Dismiss', {
      duration: 5000
    });
  }

  onCreate() {
    const newInvestment: NewInvestmentDto = new NewInvestmentDto();
    newInvestment.title = this.newInvestmentForm.value.title;
    newInvestment.goal_term = this.newInvestmentForm.value.goalTerm;
    newInvestment.asset_type = this.newInvestmentForm.value.assetType;
    newInvestment.member_id = this.newInvestmentForm.value.member;

    this.investmentsService.create(newInvestment);
  }

}
