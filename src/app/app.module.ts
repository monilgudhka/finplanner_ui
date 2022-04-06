import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    HomeComponent,
    AnalysisComponent,
    InvestmentsComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
