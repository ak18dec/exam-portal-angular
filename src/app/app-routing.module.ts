import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    canActivate: [AdminGuard],
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
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'topics',
        component: TopicsComponent
      },
      {
        path: 'quizzes',
        component: ComingSoonComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
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
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
