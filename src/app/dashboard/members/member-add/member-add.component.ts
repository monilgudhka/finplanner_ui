import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MembersService } from 'src/app/shared/service/members.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html'
})
export class MemberAddComponent implements OnInit {
  createForm: FormGroup;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  onCreate(formDirective: FormGroupDirective) {
    this.membersService.create(this.createForm.value.name);
    this.createForm.reset();
    formDirective.resetForm();
  }

}
