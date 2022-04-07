import { Component, OnInit } from '@angular/core';
import { Family } from 'src/app/shared/model/family.model';
import { Growth } from 'src/app/shared/model/growth.model';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  growth: Growth;

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    const family: Family = <Family>this.familyService.getFamily();
    this.growth = family.getGrowth();
  }

  getAbsoluteReturns(): number {
    return this.growth.getCurrentAmount() - this.growth.getInvestmentAmount();
  }

  getAbsoluteReturnsPercentage(): number {
    return Math.floor(((this.growth.getCurrentAmount() / this.growth.getInvestmentAmount()) - 1) * 100);
  }

}
