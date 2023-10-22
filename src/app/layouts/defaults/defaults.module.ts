import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultsComponent } from './defaults.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { QuestionsComponent } from 'src/app/modules/questions/questions.component';
import { QuizComponent } from 'src/app/modules/quiz/quiz.component';
import { SubjectsComponent } from 'src/app/modules/subjects/subjects.component';
import { TopicsComponent } from 'src/app/modules/topics/topics.component';
import { UtilsModule } from 'src/app/utils/utils.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { UserComponent } from 'src/app/modules/users/user/user.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuestionComponent } from 'src/app/modules/questions/question/question.component';
import { SubjectDialogComponent } from 'src/app/modules/subjects/subject-dialog/subject-dialog.component';
import { TopicDialogComponent } from 'src/app/modules/topics/topic-dialog/topic-dialog.component';
import { QuizFormComponent } from 'src/app/modules/quiz/quiz-form/quiz-form.component';


@NgModule({
  declarations: [
    DefaultsComponent,
    DashboardComponent,
    QuestionsComponent,
    TopicsComponent,
    QuizComponent,
    SubjectsComponent,
    ProfileComponent,
    UsersComponent,
    UserComponent,
    QuestionComponent,
    SubjectDialogComponent,
    TopicDialogComponent,
    QuizFormComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    SharedModule,
    RouterModule,
    CKEditorModule
  ]
})
export class DefaultsModule { }
