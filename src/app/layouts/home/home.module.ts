import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
