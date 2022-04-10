import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Family } from '../shared/model/family.model';
import { AuthService } from '../shared/service/auth.service';
import { BackendService } from '../shared/service/backend.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  @ViewChild('loginId') loginId: ElementRef;

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSignIn() {
    const isSignInSuccess = this.authService.signIn(this.loginId.nativeElement.value);
    if (isSignInSuccess) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid Login Id');
    }
  }

  onCreateFamily() {
    this.backendService
      .createFamily(this.loginId.nativeElement.value)
      .subscribe({
        next: (family: Family) => {
          this.onSignIn();
        },

        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error, 'Dismiss', {
            duration: 5000
          });
        }
      });
  }
}
