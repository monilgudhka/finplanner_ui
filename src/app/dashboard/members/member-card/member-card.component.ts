import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/shared/model/member.model';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html'
})
export class MemberCardComponent {
  @Input() member: Member;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  gotoInvestments() {
    this.router.navigate(['../', 'investments'], { relativeTo: this.route });
  }
}
