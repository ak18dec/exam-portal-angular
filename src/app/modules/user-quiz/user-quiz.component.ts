import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuizService } from 'src/app/services/quiz.service';
import { UserquizService } from 'src/app/services/userquiz.service';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss']
})
export class UserQuizComponent implements OnInit {

  quizQuestions: Question[] = [];
  
  @Input() quizId: number = -1;
  dataLoaded: boolean = false;

  quizTime: number = -1;

  quizMetaData: any;

  scoreGenerated: boolean = false;
  scoreDetails: any;

  scoreSubscription: Subscription;

  message: string = 'Time Remaining';

  timer: number = 0;

  stopTimer: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private usrQuizService: UserquizService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if(id){
        this.quizId = id;
        this.getQuestionsByQuizId(this.quizId);
        this.quizTime = this.quizService.getSelectedQuizTime(this.quizId);
        this.quizMetaData = this.quizService.getQuizMetaData(this.quizId)
        this.timer = this.quizTime * 60;
        this.stopTimer = false;
        this.startTimer();
      }
    })

    this.scoreSubscription = this.usrQuizService.receiveScoreGeneratedEvent().subscribe(resp => {
      if(resp){
        this.scoreGenerated = true;
        this.scoreDetails = resp;
      }
    })
  }

  getQuestionsByQuizId(id: number) {
    this.quizService.getQuestionsByQuizId(id).subscribe({
      next: (resp: any) => {
        this.quizQuestions = resp;
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
    return `${min}:${sec}`;
  }


}
