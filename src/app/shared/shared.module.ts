import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UtilsModule } from '../utils/utils.module';
import { RouterModule } from '@angular/router';
import { BackComponent } from './components/back/back.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BackComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BackComponent
  ]
})
export class SharedModule { }
