import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() message: string = 'Time Remaining';

  @Input() timer: number = 5;

  @Input() userclass: string = '';

  stop: boolean = true;

  @Output() timeOver = new EventEmitter<boolean>();

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
    //this.startTimer();
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
      }else{
        this.timer--;
      }
    }, 1000)
  }

}