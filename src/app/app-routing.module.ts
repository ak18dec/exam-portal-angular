import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GenresComponent } from './pages/admin/genres/genres.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SubjectsComponent } from './pages/admin/subjects/subjects.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

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
    path: 'admin',
    component: DashboardComponent,
    //canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'users',
        component: ComingSoonComponent
      },
      {
        path: 'genres',
        component: GenresComponent
      },
      {
        path: 'subjects',
        component: SubjectsComponent
      },
      // {
      //   path: 'categories',
      //   component: CategoriesComponent
      // },
      // {
      //   path: 'topics',
      //   component: TopicsComponent
      // },
      {
        path: 'quizzes',
        component: ComingSoonComponent
      },
      // {
      //   path: 'questions',
      //   component: QuestionsComponent
      // },
      {
        path: 'answers',
        component: ComingSoonComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    //canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
