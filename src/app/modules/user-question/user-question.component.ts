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

  totalQuestions: number = 0;
  currentQuesNumber: number = 0;
  lastQuestion: boolean = false
  firstQuestion: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.totalQuestions = this.questions.length;
    this.currentQuesNumber = 0;
    this.firstQuestion = true;
    if(this.totalQuestions === 1) {
      this.lastQuestion = true;
    }
    this.populateQuestion(0);
  }

  nextQues(){
    this.firstQuestion = false;
    this.populateQuestion(this.currentQuesNumber++);
    if(this.currentQuesNumber === (this.totalQuestions - 1)) {
      this.lastQuestion = true;
    }
  }

  previousQues() {
    this.lastQuestion = false;
    this.populateQuestion(this.currentQuesNumber--);
    if(this.currentQuesNumber === 0){
      this.firstQuestion = true;
    }
  }

  populateQuestion(quesIndex: number) {
    this.currentQuestion = Object.assign({}, this.questions[quesIndex]);
  }

}
