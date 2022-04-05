import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  @ViewChild('loginId') loginId!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

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
