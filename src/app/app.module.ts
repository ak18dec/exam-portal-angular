import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { DefaultsModule } from './layouts/defaults/defaults.module';
import { UtilsModule } from './utils/utils.module';
import { HomeModule } from './layouts/home/home.module';
import { UserHomeModule } from './layouts/user-home/user-home.module';


@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    DefaultsModule,
    UtilsModule,
    HomeModule,
    UserHomeModule
  ],
  providers: [authInterceptorProviders, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
