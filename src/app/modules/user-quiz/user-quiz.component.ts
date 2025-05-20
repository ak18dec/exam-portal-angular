import { Component, computed, inject, Inject, Input, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { TrackerService } from 'src/app/services/tracker.service';
import { UserquizService } from 'src/app/services/userquiz.service';
import { QuizSubmitConfirmDialogComponent } from './quiz-submit-confirm-dialog/quiz-submit-confirm-dialog.component';

@Component({
    selector: 'app-user-quiz',
    templateUrl: './user-quiz.component.html',
    styleUrls: ['./user-quiz.component.scss'],
    standalone: false
})
export class UserQuizComponent implements OnInit {

  questionService = inject(QuestionService)

  quizQuestions: Question[] = [];
  
  quizTime: number = 10;

  scoreGenerated: boolean = false;
  scoreDetails: any;

  scoreSubscription: Subscription;

  stopTimer: boolean = false;

  totalTime = 300; // in seconds (e.g., 5 minutes)
  timeLeft = signal(this.totalTime); //signal for current time
  private timerId: any;

  // Separate computed signals
  minutes = computed(() => this.pad(Math.floor(this.timeLeft() / 60)));
  seconds = computed(() => this.pad(this.timeLeft() % 60));
  quizQues: Question;

  allChoices: any = [];
  displayedQuesIndex = 0;
  totalQuestionLength = 0;

  userChoices: any[] = [];

  readonly dialog = inject(MatDialog)

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private usrQuizService: UserquizService,
    private trackerService: TrackerService,) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   const id = Number(params.get('id'));
    //   if(id){
    //     this.quizId = id;
    //     this.prepareQuiz(this.quizId);
    //   }
      
    // })

    // this.scoreSubscription = this.usrQuizService.receiveScoreGeneratedEvent().subscribe(resp => {
    //   if(resp){
    //     this.scoreGenerated = true;
    //     this.scoreDetails = resp;
    //   }
    // })
    this.quizQuestions = this.questionService.questions();
    this.totalQuestionLength = this.quizQuestions.length;
    if(this.quizQuestions && this.totalQuestionLength > 0) {
      this.prepareQuiz();
    }
  }

  prepareQuiz() {
    // if(this.quizTime) {
    //   this.totalTime = Number.isInteger(this.quizTime) ? `${this.quizTime}:00` : `${this.quizTime}`;
    // }
    // this.timer = this.quizTime * 60;
    // this.stopTimer = false;
    this.quizQuestions.forEach((ques, index) => {
      this.userChoices.push({
        qIndex: index,
        marking: undefined,
        choiceIndex: undefined
      })
    });
    this.startQuiz();
    
  }



  startTimer(): void {
    console.log('Timer Started')
    this.timerId = setInterval(() => {
      if(this.timeLeft() > 0) {
        this.timeLeft.update(time => time - 1);
      }else {
        clearInterval(this.timerId);
        this.onTimeUp();
      }
    }, 1000);
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  onTimeUp(): void {
    console.log('Time is up! Submit the quiz.');
    // handle auto-submit or timeout UI
  }



  startQuiz() {
    // this.startTimer();
    this.displayCurrentQuestion(0);
  }

  randomizeChoices() {
    this.allChoices = [...this.quizQues.incorrect_answers, this.quizQues.correct_answer];
    this.shuffleArray(this.allChoices);
  }

  shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
}

  navigateQues(direction: 'prev' | 'next') {
    if(direction === 'next') {
      this.displayCurrentQuestion(this.displayedQuesIndex+1);
    }else {
      this.displayCurrentQuestion(this.displayedQuesIndex-1);
    }
  }

  displayCurrentQuestion(index: number) {
    this.displayedQuesIndex = index;
    this.quizQues = this.quizQuestions[index];
    this.randomizeChoices();
  }

  userChoice(choice: string, index: number) {
    this.userChoices[this.displayedQuesIndex].choiceIndex = index
    if(this.quizQues.correct_answer === choice) {
      this.userChoices[this.displayedQuesIndex].marking = 'correct'
    }else {
      this.userChoices[this.displayedQuesIndex].marking = 'incorrect'
    }
  }

  submitQuiz() {
    console.log('Submit Clicked')
    console.log(this.userChoices)
    this.confirmDialog();
  }

  confirmDialog(): void {
      let dialogRef = this.dialog.open(QuizSubmitConfirmDialogComponent, {
        width: '400px',
        data: Object.assign({},this.userChoices)
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log("Success", result);
      });
    }
  

}
