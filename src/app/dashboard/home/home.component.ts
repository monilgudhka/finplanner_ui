import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Growth } from 'src/app/shared/model/growth.model';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  growth: Growth;

  private familySubscription: Subscription;

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.familySubscription = this.familyService.subscribeFamily(family => {
      this.growth = family.getGrowth();
    });
    const family = this.familyService.getFamily();
    if (family) {
      this.growth = family.getGrowth();
    }
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
  }

}
