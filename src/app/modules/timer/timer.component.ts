import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from 'src/app/services/timer.service';
import { UserquizService } from 'src/app/services/userquiz.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() message: string = 'Time Remaining';

  @Input() totalTime: number = 0;

  stopTimer: boolean = false;

  quizSubmitSubscription: Subscription;

  timer: number = 0;

  constructor(private timerService: TimerService, private usrQuizService: UserquizService) { }

  ngOnInit(): void {
    this.timer = this.totalTime * 60;
    this.startTimer();
    this.quizSubmitSubscription = this.usrQuizService.receiveQuizSubmitEvent().subscribe(resp => {
      this.stopTimer = true;
    })
  }

  formattedTime() {
    const min = Math.floor(this.timer/60)
    const sec = this.timer - min*60;
    let time = '';
    if(min>0 && sec>0){
      time = time.concat(`${min} min : ${sec} sec`)
    }else if(min>0){
      time = time.concat(`${min} min`)
    }else if(sec>0){
      time = time.concat(`${sec} sec`)
    }else{
      time = 'Times Up'
    }
    
    return time;
  }

  startTimer() {
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.timerService.broadcastTimeUpEvent();
        clearInterval(t)
      } else if(!this.stopTimer) {
        this.timer--;
      } else{
        // console.log('Broadcasting User Time')
        let userTime = (this.totalTime * 60) - this.timer;
        // console.log(userTime)
        this.timerService.broadcastQuizSubmitTimeEvent(userTime);
        this.quizSubmitSubscription.unsubscribe();
        clearInterval(t)
      }
    }, 1000)
  }
}
