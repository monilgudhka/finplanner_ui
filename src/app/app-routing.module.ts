import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { NewInvestmentComponent } from './home/investments/new-investment/new-investment.component';
import { InvestmentsComponent } from './home/investments/investments.component';
import { MembersComponent } from './home/members/members.component';
import { AuthGuardService } from './shared/service/authguard.service';
import { SigninComponent } from './signin/signin.component';
import { InvestmentEditComponent } from './home/investments/investment-edit/investment-edit.component';
import { TransactionsComponent } from './home/transactions/transactions.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'investments/new', component: NewInvestmentComponent },
      { path: 'investments/:id/edit', component: InvestmentEditComponent },
      { path: 'investments', component: InvestmentsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'transactions', component: TransactionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
