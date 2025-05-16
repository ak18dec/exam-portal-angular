import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  //GET APIs

  public getQuestions(): Observable<Question> {
    let url = `${baseUrl}/questions/`;
    return this.http.get<Question>(url);
  }

  public getQuestionById(id: number) {
    let url = `${baseUrl}/questions/${id}`;
    let response =  this.http.get(url);
    return response;
  }

  //CREATE APIs

  public addQuestion(newQuestion: Question) {
    // let question: Question = {
    //   id: 0,
    //   description: '',
    //   proficiency: '',
    //   enabled: true,
    //   questionChoices: []
    // }

    // question.description = newQuestion.description;
    // question.proficiency = newQuestion.proficiency;
    // question.enabled = newQuestion.enabled;
    // question.questionChoices = newQuestion.questionChoices;

    // let url = `${baseUrl}/questions/`;

    // return this.http.post<Question>(url, question);

  }

  //UPDATE APIs

  public updateQuestion(editQues: Question, id: number) {
    // let url = `${baseUrl}/questions/${id}`;
    // return this.http.put<boolean>(url, editQues);
  }

  public toggleQuestionState(toggledQues: Question, id: number) {
    // return this.updateQuestion(toggledQues, id);
  }

  //DELETE APIs

  public deleteQuestion(id: number) {
    // let url = `${baseUrl}/questions/${id}`;
    // return this.http.delete<boolean>(url);
  }
}
