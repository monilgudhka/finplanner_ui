import { Component, OnInit } from '@angular/core';
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
    this.growth = this.familyService.getFamily().getGrowth();
  }

}
