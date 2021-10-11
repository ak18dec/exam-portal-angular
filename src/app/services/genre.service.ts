import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Genre } from '../models/genre';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  
  //GET APIs

  public getGenres() : Observable<Genre>{
    let url = `${baseUrl}/genres/`;
    return this.http.get<Genre>(url);
  }

  // public getGenre(title: string){
  //   return of(genres.find(g=> g.title === title));
  // }

  //CREATE APIs

  public addGenre(newGenreData: Genre){
    let genreData: Genre = {
      id: 0,
      title:'',
      description:'',
      enabled: true
    };

    genreData.title = newGenreData.title;
    genreData.description = newGenreData.description;

    let url = `${baseUrl}/genres/`;

    return this.http.post<Genre>(url, genreData);
  
  }

  //UPDATE APIs

  public updateGenre(editGenreData: Genre, id: number){

    let url = `${baseUrl}/genres/${id}`;
    return this.http.put<boolean>(url, editGenreData);

  }

  public toggleGenreState(toggledGenre: Genre, id: number) {

    return this.updateGenre(toggledGenre, id)

  }

  // public toggleGenres(){
  //   genres.forEach(g=>{
  //     let oldState = g.enabled;
  //     g.enabled = !oldState;
  //   });
  // }

  // public enableAllGenres(){
  //   genres.forEach(g=>g.enabled = true);

  //   return of(genres);
  // }

  // public disableAllGenres(){
  //   genres.forEach(g=>g.enabled = false);

  //   return of(genres);
  // }

  //DELETE APIs

  public deleteGenre(id: any){

    let url = `${baseUrl}/genres/${id}`;
    return this.http.delete<boolean>(url);

  }
  
  // public deleteAllGenres(){
  //   genres.length = 0;
  //   return of(genres);
  // }
}
