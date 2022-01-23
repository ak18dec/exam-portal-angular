import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';
import { unzip } from 'zlib';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

    //GET APIs

    public getQuizes(): Observable<Question> {
      let url = `${baseUrl}/quiz/`;
      return this.http.get<Question>(url);
    }
  
    public getQuizById(id: number) {
      let url = `${baseUrl}/quiz/${id}`;
      let response =  this.http.get(url);
      console.log(response);
      return response;
    }

    public getQuestionsByQuizId(id: number) {
      let url = `${baseUrl}/quiz/${id}`;
      let response =  this.http.get(url);
      console.log(response);
      return response;
    }
  
    //CREATE APIs
  
    public addQuiz(newQuiz: Quiz) {
      let quiz: Quiz = {
        id: 0,
        title: '',
        description: '',
        questionIds: [],
        proficiencyId: -1,
        published: false,
        instructionEnabled: false,
        instructionIds: [],
        maxMarks: 0,
        maxTime: 0
      }
  
      quiz.title = newQuiz.title;
      quiz.description = newQuiz.description;
      quiz.questionIds = newQuiz.questionIds;
      quiz.proficiencyId = newQuiz.proficiencyId;
      quiz.published = newQuiz.published;
      quiz.instructionEnabled = newQuiz.instructionEnabled;
      quiz.instructionIds = newQuiz.instructionIds;
      quiz.maxMarks = newQuiz.maxMarks;
      quiz.maxTime = newQuiz.maxTime;

      let url = `${baseUrl}/quiz/`;
  
      return this.http.post<Quiz>(url, quiz);
  
    }
  
    //UPDATE APIs
  
    public updateQuiz(editQuiz: Quiz, id: number) {
      let url = `${baseUrl}/quiz/${id}`;
      return this.http.put<boolean>(url, editQuiz);
    }
  
    public toggleQuizState(toggledQuiz: Quiz, id: number) {
      return this.updateQuiz(toggledQuiz, id);
    }
  
    //DELETE APIs
  
    public deleteQuiz(id: number) {
      let url = `${baseUrl}/quiz/${id}`;
      return this.http.delete<boolean>(url);
    }
}
