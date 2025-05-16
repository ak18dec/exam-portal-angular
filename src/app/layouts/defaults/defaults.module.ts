import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultsComponent } from './defaults.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { QuestionsComponent } from 'src/app/modules/questions/questions.component';
import { QuizComponent } from 'src/app/modules/quiz/quiz.component';
import { CategoryComponent } from 'src/app/modules/categories/categories.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { UserComponent } from 'src/app/modules/users/user/user.component';
import { QuestionComponent } from 'src/app/modules/questions/question/question.component';
import { CategorytDialogComponent } from 'src/app/modules/categories/category-dialog/category-dialog.component';
import { QuizFormComponent } from 'src/app/modules/quiz/quiz-form/quiz-form.component';


@NgModule({
  declarations: [
    DefaultsComponent,
    DashboardComponent,
    QuestionsComponent,
    QuizComponent,
    CategoryComponent,
    ProfileComponent,
    UsersComponent,
    UserComponent,
    QuestionComponent,
    CategorytDialogComponent,
    QuizFormComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    SharedModule,
    RouterModule
  ]
})
export class DefaultsModule { }
