import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FamilyService } from '../shared/service/family.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;

  private familySubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private familyService: FamilyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.familySubscription = this.familyService.subscribeFamily(family => this.onSignInSuccess());
    this.errorSubscription = this.familyService.subscribeError(error => this.onSignInFailure(error));

    this.signInForm = new FormGroup({
      'loginId': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private onSignInSuccess() {
    this.router.navigate(['/home']);
  }

  private onSignInFailure(error: HttpErrorResponse) {
    this.snackBar.open(error.error, 'Dismiss', {
      duration: 5000
    });
  }

  onSubmit() {
    this.familyService.load(this.signInForm.value.loginId);
  }

  onCreate() {
    this.familyService.create(this.signInForm.value.loginId);
  }
}
