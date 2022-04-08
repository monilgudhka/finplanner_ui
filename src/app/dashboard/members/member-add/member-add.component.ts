import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html'
})
export class MemberAddComponent {
  @ViewChild('memberName') memberName: ElementRef;

  constructor(private familyService: FamilyService) { }

  onAddMember() {
    this.familyService.createMember(this.memberName.nativeElement.value);
    this.memberName.nativeElement.value = '';
  }

}
