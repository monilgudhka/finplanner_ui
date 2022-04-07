import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/model/member.model';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit {
  memberList: Array<Member> = [];

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.memberList = this.familyService.getFamily().getAllMembers();
  }

}
