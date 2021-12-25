import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { DefaultsModule } from './layouts/defaults/defaults.module';
import { UtilsModule } from './utils/utils.module';
import { HomeModule } from './layouts/home/home.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WelcomeComponent,
    ComingSoonComponent,
    UserDashboardComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    DefaultsModule,
    UtilsModule,
    HomeModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
