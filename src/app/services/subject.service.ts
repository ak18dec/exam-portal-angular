import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import baseUrl from './helper';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public genreSelected: number;

  constructor(private http: HttpClient) { }

  //GET APIs
  public getSubjects() : Observable<Subject>{
    let url = `${baseUrl}/subjects/`;
    return this.http.get<Subject>(url);
  }

  // public getSubject(id: number){
  //   return of(subjects.find(s=> s.id === id));
  // }

  // public getSubjectByGenre(genreId:number, id:number){
  //   return of(subjects.filter(s=>s.genreId === genreId).find(s1=>s1.id === id));
  // }

  // public getAllSubjectsByGenre(){
  //   return of(subjects.filter(s=>s.genreId))
  // }


  //CREATE APIs

  public addSubject(newSubject: Subject){
    let subj: Subject = {
      id: 0,
      title: '',
      description: '',
      // genreId: 0,
      enabled: true
    }

    subj.title = newSubject.title;
    subj.description = newSubject.description;
    // subj.genreId = newSubject.genreId;
    subj.enabled = newSubject.enabled;

    let url = `${baseUrl}/subjects/`;

    return this.http.post<Subject>(url, subj);
    
  }

  // public addSubjects(subjectList: Subject[]){
  //   return of(subjects.concat(subjectList));
  // }
  
  
  //UPDATE APIs

  public updateSubject(editSubj: Subject, id: number){
    
    let url = `${baseUrl}/subjects/${id}`;
    return this.http.put<boolean>(url, editSubj);

  }

  public toggleSubjectState(toggledSubject: Subject, id: number){
    
    return this.updateSubject(toggledSubject, id);
  }

  // public toggleSubjectsState(){
  //   subjects.forEach(s=> {
  //     let oldState = s.enabled;
  //     s.enabled = !oldState;
  //   });
  //   return of(subjects);
  // }

  // public toggleSubjectByGenre(genreId: number, id: number){
  //   let idxToToggle = subjects.filter(s => s.genreId === genreId).findIndex(s1=> s1.id === id);
  //   let oldState = subjects[idxToToggle].enabled;

  //   subjects[idxToToggle].enabled = !oldState;

  //   return subjects;
  // }

  // public toggleSubjectsByGenre(genreId: number){
  //   subjects.filter(s=> s.genreId === genreId).forEach(s1 => {
  //     let oldState = s1.enabled;
  //     s1.enabled = !oldState;
  //   })

  //   return of(subjects);
  // }
  

  
  //DELETE APIs

  public deleteSubject(id: number){

    let url = `${baseUrl}/subjects/${id}`;
    return this.http.delete<boolean>(url);

  }

  // public deleteAllSubjects(){
  //   subjects.length = 0;
  //   return of(subjects);
  // }

  // public deleteSubjectByGenre(genreId: number, id: number){
  //   let idxToDelete = subjects.filter(s=> s.genreId === genreId).findIndex(s1=>s1.id === id);
    
  //   subjects.splice(idxToDelete,1);

  //   return of(subjects);

  // }

  // public deleteSubjectsByGenre(genreId: number){
  //   return of(subjects.filter(s=>s.genreId !== genreId));
  // }


  // public captureSubjectGenre(){
  //   console.log(`Selected Genre is ${this.genreSelected}`)
  // }

}
