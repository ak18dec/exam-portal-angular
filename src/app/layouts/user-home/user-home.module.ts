import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home.component';
import { UserDashboardComponent } from 'src/app/modules/user-dashboard/user-dashboard.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    SharedModule
  ]
})
export class UserHomeModule { }
