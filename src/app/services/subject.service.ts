import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Subject } from '../models/subject';

const subjects: Subject[] = [
  {
    id: 1,
    title: 'Maths',
    description: 'Maths Description',
    genreId: 1,
    enabled: true
  },
  {
    id: 2,
    title: 'Biology',
    description: 'Biology Description',
    genreId: 3,
    enabled: true
  },
  {
    id: 3,
    title: 'Zoology',
    description: 'Zoology Description',
    genreId: 3,
    enabled: true
  },
  {
    id: 4,
    title: 'Computer Networking',
    description: 'CN Description',
    genreId: 1,
    enabled: true
  },
  {
    id: 5,
    title: 'Databases',
    description: 'DB Description',
    genreId: 1,
    enabled: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public genreSelected: number;

  constructor(private http: HttpClient) { }

  //GET APIs
  public getSubjects(){
    return of(subjects);
  }

  public getSubject(id: number){
    return of(subjects.find(s=> s.id === id));
  }

  public getSubjectByGenre(genreId:number, id:number){
    return of(subjects.filter(s=>s.genreId === genreId).find(s1=>s1.id === id));
  }

  public getAllSubjectsByGenre(){
    return of(subjects.filter(s=>s.genreId))
  }


  //CREATE APIs

  public addSubject(newSubject: Subject){
    let subj: Subject = {
      id: 0,
      title: '',
      description: '',
      genreId: 0,
      enabled: true
    }

    subj.id = subjects.length + 1;
    subj.title = newSubject.title;
    subj.description = newSubject.description;
    subj.genreId = newSubject.genreId;
    subj.enabled = newSubject.enabled;

    subjects.push(subj);

    return of(subjects);
  }

  public addSubjects(subjectList: Subject[]){
    return of(subjects.concat(subjectList));
  }
  
  
  //UPDATE APIs

  public updateSubject(editSubj: Subject){
    let idxToUpdate = subjects.findIndex(s=>s.id === editSubj.id);

    subjects[idxToUpdate].title = editSubj.title;
    subjects[idxToUpdate].description = editSubj.description;
    subjects[idxToUpdate].genreId = editSubj.genreId;
    subjects[idxToUpdate].enabled = editSubj.enabled;

    return of(subjects);
  }

  public toggleSubjectState(id: number){
    let idxToToggle = subjects.findIndex(s=>s.id === id);
    let ss = subjects[idxToToggle].enabled;

    subjects[idxToToggle].enabled = !ss;

    return of(subjects);
  }

  public toggleSubjectsState(){
    subjects.forEach(s=> {
      let oldState = s.enabled;
      s.enabled = !oldState;
    });
    return of(subjects);
  }

  public toggleSubjectByGenre(genreId: number, id: number){
    let idxToToggle = subjects.filter(s => s.genreId === genreId).findIndex(s1=> s1.id === id);
    let oldState = subjects[idxToToggle].enabled;

    subjects[idxToToggle].enabled = !oldState;

    return subjects;
  }

  public toggleSubjectsByGenre(genreId: number){
    subjects.filter(s=> s.genreId === genreId).forEach(s1 => {
      let oldState = s1.enabled;
      s1.enabled = !oldState;
    })

    return of(subjects);
  }
  

  
  //DELETE APIs

  public deleteSubject(id: number){

    let idxToDelete = subjects.findIndex(s=>s.id === id);

    subjects.splice(idxToDelete, 1);

    return of(subjects);

  }

  public deleteAllSubjects(){
    subjects.length = 0;
    return of(subjects);
  }

  public deleteSubjectByGenre(genreId: number, id: number){
    let idxToDelete = subjects.filter(s=> s.genreId === genreId).findIndex(s1=>s1.id === id);
    
    subjects.splice(idxToDelete,1);

    return of(subjects);

  }

  public deleteSubjectsByGenre(genreId: number){
    return of(subjects.filter(s=>s.genreId !== genreId));
  }


  public captureSubjectGenre(){
    console.log(`Selected Genre is ${this.genreSelected}`)
  }

  

}
