import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NewInvestmentComponent } from './dashboard/investments/new-investment/new-investment.component';
import { InvestmentsComponent } from './dashboard/investments/investments.component';
import { MembersComponent } from './dashboard/members/members.component';
import { AuthGuardService } from './shared/service/authguard.service';
import { SigninComponent } from './signin/signin.component';
import { InvestmentEditComponent } from './dashboard/investments/investment-edit/investment-edit.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'analysis', component: AnalysisComponent },
      { path: 'investments/new', component: NewInvestmentComponent },
      { path: 'investments/:id/edit', component: InvestmentEditComponent },
      { path: 'investments', component: InvestmentsComponent },
      { path: 'members', component: MembersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
