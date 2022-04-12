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
import { InvestmentsComponent } from './dashboard/investments/investments.component';
import { MembersComponent } from './dashboard/members/members.component';
import { FamilyService } from './shared/service/family.service';
import { MemberCardComponent } from './dashboard/members/member-card/member-card.component';
import { MemberAddComponent } from './dashboard/members/member-add/member-add.component';
import { MaterialModule } from './material.module';
import { NewInvestmentComponent } from './dashboard/investments/new-investment/new-investment.component';
import { InvestmentEditComponent } from './dashboard/investments/investment-edit/investment-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateBackendResourceService } from "./shared/service/backend/create-backend-resource.service";
import { GetBackendResourceService } from "./shared/service/backend/get-backend-resource.service";
import { UpdateBackendResourceService } from "./shared/service/backend/update-backend-resource.service";
import { Family2Service } from './shared/service/family2.service';
import { MembersService } from './shared/service/members.service';
import { InvestmentsService } from './shared/service/investments.service';

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
    InvestmentEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    FamilyService,
    GetBackendResourceService,
    CreateBackendResourceService,
    UpdateBackendResourceService,
    Family2Service,
    MembersService,
    InvestmentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
