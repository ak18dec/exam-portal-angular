import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Quiz } from '../models/quiz';
import { UserAttemptedQuiz } from '../models/user-attempted-quiz';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserquizService {

  private quizSubmitSubject = new Subject<boolean>();

  private quizScoreGeneratedSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  //CREATE APIs
  public submitQuiz(payload: UserAttemptedQuiz) {
    let url = `${baseUrl}/user-quiz/submit`;
    return this.http.post<Quiz>(url, payload);
  }

  broadcastQuizSubmitEvent() {
    this.quizSubmitSubject.next(true);
  }

  receiveQuizSubmitEvent() {
    return this.quizSubmitSubject.asObservable();
  }

  broadcastScoreGeneratedEvent(score: any) {
    this.quizScoreGeneratedSubject.next(score);
  }

  receiveScoreGeneratedEvent() {
    return this.quizScoreGeneratedSubject.asObservable();
  }
}
