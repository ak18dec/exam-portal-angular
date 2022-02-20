import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timerSubject = new Subject<boolean>();
  private quizSubmitTimeSubject = new Subject<number>();

  constructor() { }

  broadcastTimeUpEvent() {
    this.timerSubject.next(true);
  }

  receiveTimeUpEvent() {
    return this.timerSubject.asObservable();
  }

  broadcastQuizSubmitTimeEvent(usertime: number) {
    this.quizSubmitTimeSubject.next(usertime);
  }

  receiveQuizSubmitTimeEvent() {
    return this.quizSubmitTimeSubject.asObservable();
  }
}
