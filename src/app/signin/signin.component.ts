import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  @ViewChild('loginId') loginId!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router
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
    // TODO: call Create Family API
    this.onSignIn();
  }
}
