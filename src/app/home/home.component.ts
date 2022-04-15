import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

}
