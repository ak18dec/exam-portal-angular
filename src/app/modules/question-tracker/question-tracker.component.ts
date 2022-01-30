import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-question-tracker',
  templateUrl: './question-tracker.component.html',
  styleUrls: ['./question-tracker.component.scss']
})
export class QuestionTrackerComponent implements OnInit {

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {
  }

  finishTest() {
    console.log('finish test clicked')
    this.trackerService.broadcastFinishTestEvent();
  }

}
