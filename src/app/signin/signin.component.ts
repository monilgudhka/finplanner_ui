import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Family2Service } from '../shared/service/family2.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('loginId') loginId: ElementRef;

  private familySubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private familyService: Family2Service,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.familySubscription = this.familyService.subscribeFamily(family => this.onSignInSuccess());
    this.errorSubscription = this.familyService.subscribeError(error => this.onSignInFailure(error));
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private onSignInSuccess() {
    this.router.navigate(['/dashboard']);
  }

  private onSignInFailure(error: HttpErrorResponse) {
    this.snackBar.open(error.error, 'Dismiss', {
      duration: 5000
    });
  }

  onSignIn() {
    this.familyService.load(this.loginId.nativeElement.value);
  }

  onCreateFamily() {
    this.familyService.create(this.loginId.nativeElement.value);
  }
}
