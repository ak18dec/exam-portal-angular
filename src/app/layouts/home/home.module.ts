import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
