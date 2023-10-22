import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes : Quiz[] = [];

  constructor(private http: HttpClient) { }

    //GET APIs

    public getQuizes(): Observable<Question> {
      let url = `${baseUrl}/quiz/`;
      return this.http.get<Question>(url);
    }
  
    public getQuizById(id: number) {
      let url = `${baseUrl}/quiz/${id}`;
      let response =  this.http.get(url);
      // console.log(response);
      return response;
    }

    public getQuestionsByQuizId(id: number) {
      let url = `${baseUrl}/quiz/${id}/questions`;
      let response =  this.http.get(url);
      // console.log(response);
      return response;
    }
  
    //CREATE APIs
  
    public addQuiz(newQuiz: Quiz) {
      let quiz: Quiz = {
        id: 0,
        title: '',
        description: '',
        questionIds: [],
        published: false,
        maxMarks: 0,
        maxTime: 0
      }
  
      quiz.title = newQuiz.title;
      quiz.description = newQuiz.description;
      quiz.questionIds = newQuiz.questionIds;
      quiz.published = newQuiz.published;
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

    //CACHE QUIZ LIST DATA FOR USER
    storeQuizesInCache(data: Quiz[]) {
      this.quizzes = Object.assign([], data);
    }
  
    getQuizesFromCache(){
      return this.quizzes;
    }

    getSelectedQuizTime(quizId: number) {
      const selectedQuiz = this.quizzes.find(quiz => quiz.id === quizId)
      if(selectedQuiz) {
        return selectedQuiz.maxTime;
      }
      return -1;
    }

    getQuizMetaData(quizId: number) {
      const selectedQuiz = this.quizzes.find(quiz => quiz.id === quizId)
      if(selectedQuiz){
        let metadata = {
          id: quizId,
          title: selectedQuiz.title,
          description: selectedQuiz.description,
          maxMarks: selectedQuiz.maxMarks,
          maxTime: selectedQuiz.maxTime
        }
        return metadata
      }
      return null;
    }
}
