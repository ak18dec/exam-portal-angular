import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { LoginComponent } from './layouts/home/login/login.component';
import { SignupComponent } from './layouts/home/signup/signup.component';
import { CategoryComponent } from './modules/categories/categories.component';
import { DefaultsComponent } from './layouts/defaults/defaults.component';
import { HomeComponent } from './layouts/home/home.component';
import { UsersComponent } from './modules/users/users.component';
import { UserComponent } from './modules/users/user/user.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { UserHomeComponent } from './layouts/user-home/user-home.component';
import { UserQuizComponent } from './modules/user-quiz/user-quiz.component';
import { UserQuizListComponent } from './modules/user-quiz-list/user-quiz-list.component';
import { UserAnalyticsComponent } from './modules/user-analytics/user-analytics.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ForgotPasswordComponent } from './layouts/home/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/home/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'password-reset/:token',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DefaultsComponent,
    canActivate: [AdminGuard],
    data: { title: 'Admin'},
    children: [
      {
        path: '',
        component: ComingSoonComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/new',
        component: UserComponent,
        pathMatch: 'full'
      },
      {
        path: 'users/:id',
        component: UserComponent,
        pathMatch: 'full'
      },
      {
        path: 'categories',
        component: CategoryComponent
      },
    ]
  },
  {
    path: 'user',
    component: UserHomeComponent,
    // canActivate: [UserGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'quizzes'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'analytics',
        component: UserAnalyticsComponent
      },
      {
        path: 'quizzes',
        component: UserQuizListComponent
      },
      {
        path: 'quiz',
        pathMatch: 'full',
        component: UserQuizComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
