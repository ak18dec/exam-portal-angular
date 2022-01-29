import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { LoginComponent } from './layouts/home/login/login.component';
import { SignupComponent } from './layouts/home/signup/signup.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { GenresComponent } from './modules/genres/genres.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { SubjectsComponent } from './modules/subjects/subjects.component';
import { TopicsComponent } from './modules/topics/topics.component';
import { DefaultsComponent } from './layouts/defaults/defaults.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './layouts/home/home.component';
import { UsersComponent } from './modules/users/users.component';
import { UserComponent } from './modules/users/user/user.component';
import { QuestionComponent } from './modules/questions/question/question.component';
import { InstructionsComponent } from './modules/instructions/instructions.component';
import { InstructionComponent } from './modules/instructions/instruction/instruction.component';
import { QuizComponent } from './modules/quiz/quiz.component';
import { QuizFormComponent } from './modules/quiz/quiz-form/quiz-form.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { UserHomeModule } from './layouts/user-home/user-home.module';
import { UserHomeComponent } from './layouts/user-home/user-home.component';
import { UserQuizComponent } from './modules/user-quiz/user-quiz.component';
import { UserQuizListComponent } from './modules/user-quiz-list/user-quiz-list.component';
import { UserReportsComponent } from './modules/user-reports/user-reports.component';
import { UserAnalyticsComponent } from './modules/user-analytics/user-analytics.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { UserQuizInstructionsComponent } from './modules/user-quiz-instructions/user-quiz-instructions.component';

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
        component: QuizComponent
      },
      {
        path: 'quizes/new',
        component: QuizFormComponent,
        pathMatch: 'full'
      },
      {
        path: 'quizes/:id',
        component: QuizFormComponent,
        pathMatch: 'full'
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
      },
      {
        path: 'instructions/:id',
        component: InstructionComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserHomeComponent,
    // pathMatch: 'full',
    canActivate: [UserGuard],
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
        path: 'analytics',
        component: UserAnalyticsComponent
      },
      {
        path: 'reports',
        component: UserReportsComponent
      },
      {
        path: 'quizzes',
        component: UserQuizListComponent
      },
      {
        path: 'quiz/:id/start',
        pathMatch: 'full',
        component: UserQuizComponent
      },
      {
        path: 'quiz/:id/instructions',
        pathMatch: 'full',
        component: UserQuizInstructionsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
