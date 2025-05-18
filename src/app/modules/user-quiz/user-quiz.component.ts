import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuizService } from 'src/app/services/quiz.service';
import { TrackerService } from 'src/app/services/tracker.service';
import { UserquizService } from 'src/app/services/userquiz.service';

@Component({
    selector: 'app-user-quiz',
    templateUrl: './user-quiz.component.html',
    styleUrls: ['./user-quiz.component.scss'],
    standalone: false
})
export class UserQuizComponent implements OnInit {

  quizQuestions: Question[] = [];
  
  @Input() quizId: number = -1;
  dataLoaded: boolean = false;

  quizTime: number = 10;

  quizMetaData: any;

  scoreGenerated: boolean = false;
  scoreDetails: any;

  scoreSubscription: Subscription;

  timer: number = 0;

  stopTimer: boolean = false;
  loadInstructions: boolean = true;

  eachQuestionWeightage: number = 0;

  totalTime: string;

  minutes: string = '00';
  seconds: string = '00';
  quizQues: any = {
    "type": "multiple",
    "difficulty": "medium",
    "category": "General Knowledge",
    "question": "Macintosh has named six of its operating systems after big cats. What big cat did Macintosh name their 2007 release after? ",
    "correct_answer": "Leopard",
    "incorrect_answers": [
      "Tiger",
      "Panther",
      "Puma"
    ]
  }

  allChoices: any = [];
  selectedChoiceIndex: number = -1;
  displayedQuesIndex = 0;
  totalQuestionLength = 1;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private usrQuizService: UserquizService,
    private trackerService: TrackerService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if(id){
        this.quizId = id;
        this.prepareQuiz(this.quizId);
      }
      this.randomizeChoices();
    })

    this.scoreSubscription = this.usrQuizService.receiveScoreGeneratedEvent().subscribe(resp => {
      if(resp){
        this.scoreGenerated = true;
        this.scoreDetails = resp;
      }
    })
  }

  prepareQuiz(id: number) {
    // this.getQuestionsByQuizId(this.quizId);
    // this.quizTime = this.quizService.getSelectedQuizTime(this.quizId);
    if(this.quizTime) {
      this.totalTime = Number.isInteger(this.quizTime) ? `${this.quizTime}:00` : `${this.quizTime}`;
    }
    // this.quizMetaData = this.quizService.getQuizMetaData(this.quizId)
    this.timer = this.quizTime * 60;
    this.stopTimer = false;
    this.startQuiz();
    
  }

  getQuestionsByQuizId(id: number) {
    this.quizService.getQuestionsByQuizId(id).subscribe({
      next: (resp: any) => {
        this.quizQuestions = resp;
        this.eachQuestionWeightage = (this.quizMetaData.maxMarks)/(this.quizQuestions.length);
        this.dataLoaded = true;
      },
      error: (e)=> console.log(e)
    })
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }

  startTimer() {
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.stopTimer = true;
        clearInterval(t)
      } else if(!this.stopTimer) {
        this.timer--;
      } else{
        let userTime = (this.quizTime * 60) - this.timer;
        clearInterval(t)
      }
    }, 1000)
  }

  formattedTime() {
    const min = Math.floor(this.timer/60)
    const sec = this.timer - min*60;
    let time = '';
    let minStr = '';
    let secStr = '';
    if(min > 0 && min < 10){
      minStr = `0${min}`;
    }else if(min === 0){
      minStr = `00`;
    }else {
      minStr = `${min}`;
    }

    if(sec > 0 && sec < 10){
      secStr = `0${sec}`;
    }else if(sec === 0){
      secStr = `00`;
    }else {
      secStr = `${sec}`;
    }
    
    time = `${minStr}:${secStr} / ${this.totalTime}`;

    this.minutes = minStr;
    this.seconds = secStr;

    // if(min <= 0 && sec <= 0){
    //   time = 'Times Up';
    // }
    
    return time;
  }

  finishQuiz() {
    this.trackerService.broadcastFinishTestEvent();
  }

  startQuiz() {
    this.loadInstructions = false;
    this.startTimer();
    this.formattedTime();
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
    let index = 0;
    if(direction === 'next') {
      this.fetchQuestion(index+1);
    }else {
      this.fetchQuestion(index-1);
    }
  }

  fetchQuestion(index: number) {

  }

}
