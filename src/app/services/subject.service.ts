import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import baseUrl from './helper';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  //GET APIs
  public getSubjects() : Observable<Subject>{
    let url = `${baseUrl}/subjects/`;
    return this.http.get<Subject>(url);
  }

  //CREATE APIs

  public addSubject(newSubject: Subject){
    let subj: Subject = {
      id: 0,
      title: '',
      enabled: true
    }

    subj.title = newSubject.title;
    subj.enabled = newSubject.enabled;

    let url = `${baseUrl}/subjects/`;

    return this.http.post<Subject>(url, subj);
    
  }

  //UPDATE APIs

  public updateSubject(editSubj: Subject, id: number){
    
    let url = `${baseUrl}/subjects/${id}`;
    return this.http.put<boolean>(url, editSubj);

  }

  public toggleSubjectState(toggledSubject: Subject, id: number){
    
    return this.updateSubject(toggledSubject, id);
  }

  //DELETE APIs

  public deleteSubject(id: number){

    let url = `${baseUrl}/subjects/${id}`;
    return this.http.delete<boolean>(url);

  }

}
