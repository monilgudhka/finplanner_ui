import { Component, Input } from '@angular/core';
import { Member } from 'src/app/shared/model/member.model';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html'
})
export class MemberCardComponent {
  @Input() member: Member;

  constructor() { }

  gotoInvestments() {

  }
}
