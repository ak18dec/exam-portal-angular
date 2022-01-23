import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit {

  @Input() questions: Question[] = [];

  currentQuestion: Question;

  attemptedQuestions: number[] = [];

  totalQuestions: number = 10;
  currentQuesNumber: number = 1;
  lastQuestion: boolean = true
  firstQuestion: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
