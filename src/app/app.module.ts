import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/service/auth.service';
import { AuthGuardService } from './shared/service/authguard.service';
import { HomeComponent } from './dashboard/home/home.component';
import { AnalysisComponent } from './dashboard/analysis/analysis.component';
import { InvestmentsComponent } from './dashboard/investments/investments.component';
import { MembersComponent } from './dashboard/members/members.component';
import { FamilyService } from './shared/service/family.service';
import { MemberCardComponent } from './dashboard/members/member-card/member-card.component';
import { MemberAddComponent } from './dashboard/members/member-add/member-add.component';
import { MaterialModule } from './material.module';
import { NewInvestmentComponent } from './dashboard/investments/new-investment/new-investment.component';
import { InvestmentEditComponent } from './dashboard/investments/investment-edit/investment-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    HomeComponent,
    AnalysisComponent,
    InvestmentsComponent,
    NewInvestmentComponent,
    MembersComponent,
    MemberCardComponent,
    MemberAddComponent,
    InvestmentEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    FamilyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
