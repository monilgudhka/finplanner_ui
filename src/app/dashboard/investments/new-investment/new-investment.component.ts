import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/shared/model/member.model';
import { NewInvestment } from 'src/app/shared/model/new-investment.model';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-investment-new',
  templateUrl: './new-investment.component.html'
})
export class NewInvestmentComponent implements OnInit {
  assetTypeList: Array<string> = ['MID_CAP', 'LARGE_CAP'];
  goalTermList: Array<string> = ['SHORT', 'LONG'];
  memberList: Array<Member>;

  newInvestmentForm: FormGroup;

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.memberList = this.familyService.getFamily().getAllMembers();
    this.newInvestmentForm = new FormGroup({
      'member': new FormControl(null),
      'assetType': new FormControl(null),
      'goalTerm': new FormControl(null),
      'title': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
    this.resetForm();
  }

  onSubmit() {
    const member_id: number = this.newInvestmentForm.value.member;
    const newInvestment: NewInvestment = new NewInvestment();
    newInvestment.title = this.newInvestmentForm.value.title;
    newInvestment.goalTerm = this.newInvestmentForm.value.goalTerm;
    newInvestment.assetType = this.newInvestmentForm.value.assetType;

    this.familyService.createInvestment(member_id, newInvestment);
    this.resetForm();
  }

  private resetForm() {
    const firstMember = (this.memberList.length > 0) ? this.memberList[0].getId() : null;
    this.newInvestmentForm.reset({
      'member': firstMember,
      'assetType': this.assetTypeList[0],
      'goalTerm': this.goalTermList[0],
      'title': null
    });
  }

}
