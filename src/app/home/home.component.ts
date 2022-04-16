import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { FamilyService } from '../shared/service/family.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private familyService: FamilyService
  ) { }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

  onSnapshot() {
    this.familyService.snapshot();
  }

}
