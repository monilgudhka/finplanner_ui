import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UpdateGrowthDto } from 'src/app/shared/dto/update-growth-dto.model';
import { Investment } from 'src/app/shared/model/investment.model';
import { InvestmentsService } from 'src/app/shared/service/investments.service';

@Component({
  selector: 'app-investment-edit',
  templateUrl: './investment-edit.component.html'
})
export class InvestmentEditComponent implements OnInit {
  investment: Investment;
  editForm: FormGroup;

  constructor(
    private investmentsService: InvestmentsService,
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
        this.investment = this.investmentsService.getInvestment(id);
        this.editForm.setValue({
          'investedAmount': Math.floor(this.investment.getGrowth().getInvestmentAmount()),
          'currentAmount': Math.floor(this.investment.getGrowth().getCurrentAmount())
        });
      }
    );
  }

  onSubmit() {
    const updateGrowth: UpdateGrowthDto = new UpdateGrowthDto(
      this.editForm.value.investedAmount,
      this.editForm.value.currentAmount
    );
    this.investmentsService.updateGrowth(this.investment, updateGrowth);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
