import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AuthService } from './shared/service/auth.service';
import { AuthGuardService } from './shared/service/authguard.service';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent } from './home/investments/investments.component';
import { MembersComponent } from './home/members/members.component';
import { MemberCardComponent } from './home/members/member-card/member-card.component';
import { MemberAddComponent } from './home/members/member-add/member-add.component';
import { MaterialModule } from './material.module';
import { NewInvestmentComponent } from './home/investments/new-investment/new-investment.component';
import { InvestmentEditComponent } from './home/investments/investment-edit/investment-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateBackendResourceService } from "./shared/service/backend/create-backend-resource.service";
import { GetBackendResourceService } from "./shared/service/backend/get-backend-resource.service";
import { UpdateBackendResourceService } from "./shared/service/backend/update-backend-resource.service";
import { FamilyService } from './shared/service/family.service';
import { MembersService } from './shared/service/members.service';
import { InvestmentsService } from './shared/service/investments.service';
import { ResourceService } from './shared/service/resource.service';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { SummaryComponent } from './home/dashboard/summary/summary.component';
import { InsightsComponent } from './home/dashboard/insights/insights.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    HomeComponent,
    InvestmentsComponent,
    NewInvestmentComponent,
    MembersComponent,
    MemberCardComponent,
    MemberAddComponent,
    InvestmentEditComponent,
    DoughnutChartComponent,
    SummaryComponent,
    InsightsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GetBackendResourceService,
    CreateBackendResourceService,
    UpdateBackendResourceService,
    FamilyService,
    MembersService,
    InvestmentsService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
