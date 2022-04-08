import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/model/investment.model';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  columnsToDisplay: string[] = ['title', 'goalTerm', 'assetClass', 'assetType', 'liquidity', 'member', 'investedAmount', 'currentAmount', 'rateOfReturn', 'absoluteReturns', 'absoluteReturnsPercentage', 'lastUpdated'];
  investmentList: Array<Investment>;

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.investmentList = this.familyService.getFamily().getAllInvestments();
  }

}
