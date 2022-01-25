import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question';
import { MatDialog } from '@angular/material/dialog';
import { QuizSubmitConfirmDialogComponent } from './quiz-submit-confirm-dialog/quiz-submit-confirm-dialog.component';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit {

  @Input() questions: Question[] = [];
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


  constructor(public dialog: MatDialog, private timerService: TimerService) { }

  ngOnInit(): void {
    this.totalQuestions = this.questions.length;
    this.currentQuesNumber = 0;
    this.firstQuestion = true;
    if(this.totalQuestions === 1) {
      this.lastQuestion = true;
    }
    this.populateQuestion(0);
    this.timerService.receiveTimeUpEvent().subscribe(resp=>{
      this.onTimeComplete();
    })
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

  onSubmitConfirmDialog() {
    console.log('submit clicked')
    this.openConfirmDialog();
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

  submitQuiz() {
    console.log('User Submit the Quiz')
    this.submitted = true;

  }

  openConfirmDialog(): void {

    let dialogRef = this.dialog.open(QuizSubmitConfirmDialogComponent, {
      width: '330px',
      height: '190px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.submitQuiz();
      }
    });
  }

  onTimeComplete() {
    console.log('Time Completed')
    console.log('Quiz Auto Submit')
    this.submitQuiz();
  }

}
