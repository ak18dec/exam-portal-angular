import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Quiz } from '../models/quiz';
import { UserAttemptedQuiz } from '../models/user-attempted-quiz';

@Injectable({
  providedIn: 'root'
})
export class UserquizService {

  constructor(private http: HttpClient) { }

  //CREATE APIs
  public submitQuiz(payload: UserAttemptedQuiz) {
    let url = `${baseUrl}/user-quiz/submit`;
    return this.http.post<Quiz>(url, payload);
  }
}
