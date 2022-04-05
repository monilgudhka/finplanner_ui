import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/service/auth.service';
import { AuthGuardService } from './shared/service/authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent
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
