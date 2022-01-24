import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit {

  @Input() questions: Question[] = [];
  @Output() quizSubmit = new EventEmitter<boolean>();
  submitted: boolean = false;

  currentQuestion: Question;

  attemptedQuestions: Question[] = [];
  questionAnswered: any[] = [];

  totalQuestions: number = 0;
  currentQuesNumber: number = 0;
  lastQuestion: boolean = false;
  firstQuestion: boolean = true;

  currentSelectedOptionId: number = -1;

  activeQuestion: Question;


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
    this.currentQuesNumber++;
    this.populateQuestion(this.currentQuesNumber);
    if(this.currentQuesNumber === (this.totalQuestions - 1)) {
      this.lastQuestion = true;
    }
    this.saveMarkedQuestion();
  }

  previousQues() {
    this.lastQuestion = false;
    this.currentQuesNumber--;
    this.populateQuestion(this.currentQuesNumber);
    if(this.currentQuesNumber === 0){
      this.firstQuestion = true;
    }
    this.saveMarkedQuestion();
  }

  populateQuestion(quesIndex: number) {
    this.currentQuestion = Object.assign({}, this.questions[quesIndex]);
  }

  onOptionSelect() {
    //this.attemptedQuestions.push(this.questions[this.currentQuesNumber]);
    this.questionAnswered.push({
      quesId: this.questions[this.currentQuesNumber].id,
      ansMarked: this.currentSelectedOptionId
    })
    console.log(this.questionAnswered)
  }

  onSubmit() {
    console.log('submit clicked')
    this.submitted = true;
    this.quizSubmit.emit(true);
  }

  saveMarkedQuestion() {
    if(this.questionAnswered.length < 1){
      this.currentSelectedOptionId = -1;
    }else {
      const currQuesId = this.questions[this.currentQuesNumber].id;
      const ques = this.questionAnswered.find(q => q.quesId === currQuesId);
      if(ques){
        this.currentSelectedOptionId = ques.ansMarked;
      }else {
        this.currentSelectedOptionId = -1;
      }
    }
  }

}
