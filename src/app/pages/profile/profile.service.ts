import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  APP_URL = 'https://i-exam.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  getProfile(userId: number): Observable<any> {
    let url = `${this.APP_URL}/test`;
    return this.http.get(url);
  }
}
