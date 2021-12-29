import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { LoginComponent } from './layouts/home/login/login.component';
import { SignupComponent } from './layouts/home/signup/signup.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { GenresComponent } from './modules/genres/genres.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { SubjectsComponent } from './modules/subjects/subjects.component';
import { TopicsComponent } from './modules/topics/topics.component';
import { DefaultsComponent } from './layouts/defaults/defaults.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { HomeComponent } from './layouts/home/home.component';
import { UsersComponent } from './modules/users/users.component';
import { UserComponent } from './modules/users/user/user.component';
import { QuestionComponent } from './modules/questions/question/question.component';
import { InstructionsComponent } from './modules/instructions/instructions.component';
import { InstructionComponent } from './modules/instructions/instruction/instruction.component';

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
    component: DefaultsComponent,
    //canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: ComingSoonComponent
      },
      {
        path: 'profile',
        component: ComingSoonComponent
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
        path: 'quizes',
        component: ComingSoonComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'questions/new',
        component: QuestionComponent
      },
      {
        path: 'questions/:id',
        component: QuestionComponent
      },
      {
        path: 'instructions',
        component: InstructionsComponent
      },
      {
        path: 'instructions/new',
        component: InstructionComponent
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
