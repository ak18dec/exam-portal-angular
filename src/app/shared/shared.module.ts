import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UtilsModule } from '../utils/utils.module';
import { RouterModule } from '@angular/router';
import { BackComponent } from './components/back/back.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { EpTableComponent } from './components/data-list/ep-table/ep-table.component';
import { EpListComponent } from './components/data-list/ep-list/ep-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BackComponent,
    DataListComponent,
    EpTableComponent,
    EpListComponent
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
