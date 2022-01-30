import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  private finishTestSubject = new Subject<boolean>();

  constructor() { }

  broadcastFinishTestEvent() {
    this.finishTestSubject.next(true);
  }
  receiveFinishTestEvent() {
    return this.finishTestSubject.asObservable();
  }
}
