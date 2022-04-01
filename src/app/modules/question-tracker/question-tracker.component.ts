import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-question-tracker',
  templateUrl: './question-tracker.component.html',
  styleUrls: ['./question-tracker.component.scss']
})
export class QuestionTrackerComponent implements OnInit {

  timeUp: boolean = false;

  constructor(
    private trackerService: TrackerService,
    private timerService: TimerService) { }

  ngOnInit(): void {
    this.timerService.receiveTimeUpEvent().subscribe(resp => {
      if(resp){
        this.timeUp = true;
      }
    })
  }

  finishTest() {
    // console.log('finish test clicked')
    this.trackerService.broadcastFinishTestEvent();
  }

}
