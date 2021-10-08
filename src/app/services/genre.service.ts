import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Genre } from '../models/genre';

const genres: Genre[] = [
  {
    id : 1,
    title: 'Technology',
    description:'This genre is related to IT & Tech',
    enabled : true
  },
  {
    id : 2,
    title: 'History',
    description:'This genre is related to History',
    enabled: true
  },
  {
    id : 3,
    title: 'Medical',
    description:'This genre is related to Medical Science',
    enabled: false
  }
];


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  
  //GET APIs

  public getGenres(){
    return of(genres);
  }

  public getGenre(title: string){
    return of(genres.find(g=> g.title === title));
  }

  //CREATE APIs

  public addGenre(newGenreData: Genre){
    let genreData: Genre = {
      id: 0,
      title:'',
      description:'',
      enabled: true
    };

    genreData.id = genres.length + 1;
    genreData.title = newGenreData.title;
    genreData.description = newGenreData.description;

    genres.push(genreData);

    return of(genres);
  
  }

  //UPDATE APIs

  public updateGenre(editGenreData: Genre){

    let idxToUpdate = genres.findIndex(g=>g.id === editGenreData.id);

    genres[idxToUpdate].title = editGenreData.title;
    genres[idxToUpdate].description = editGenreData.description;

    return of(genres);

  }

  public toggleGenreState(id: number){

    let idxToToggle = genres.findIndex(g=>g.id === id);
    let oldState = genres[idxToToggle].enabled;

    genres[idxToToggle].enabled = !oldState;

    return of(genres);

  }

  public toggleGenres(){
    genres.forEach(g=>{
      let oldState = g.enabled;
      g.enabled = !oldState;
    });
  }

  public enableAllGenres(){
    genres.forEach(g=>g.enabled = true);

    return of(genres);
  }

  public disableAllGenres(){
    genres.forEach(g=>g.enabled = false);

    return of(genres);
  }

  //DELETE APIs

  public deleteGenre(id: any){

    let idxToDelete = genres.findIndex(g=>g.id === id);

    genres.splice(idxToDelete, 1);

    return of(genres);

  }
  
  public deleteAllGenres(){
    genres.length = 0;
    return of(genres);
  }
}
