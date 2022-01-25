import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timerSubject = new Subject<boolean>();

  constructor() { }

  broadcastTimeUpEvent() {
    this.timerSubject.next(true);
  }

  receiveTimeUpEvent() {
    return this.timerSubject.asObservable();
  }
}
