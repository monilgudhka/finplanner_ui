import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Growth } from 'src/app/shared/model/growth.model';
import { Investment } from 'src/app/shared/model/investment.model';
import { FamilyService } from 'src/app/shared/service/family.service';

@Component({
  selector: 'app-investment-edit',
  templateUrl: './investment-edit.component.html'
})
export class InvestmentEditComponent implements OnInit {
  investment: Investment;
  editForm: FormGroup;

  constructor(
    private familyService: FamilyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'investedAmount': new FormControl(null, [Validators.required]),
      'currentAmount': new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.investment = this.familyService.getFamily().getInvestment(id);
        this.editForm.setValue({
          'investedAmount': this.investment.getGrowth().getInvestmentAmount(),
          'currentAmount': this.investment.getGrowth().getCurrentAmount()
        });
      }
    );
  }

  onSubmit() {
    const growth: Growth = this.investment.getGrowth();
    growth.setInvestmentAmount(this.editForm.value.investedAmount);
    growth.setCurrentAmount(this.editForm.value.currentAmount);
    this.familyService.updateGrowth(growth);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
