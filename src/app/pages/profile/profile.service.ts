import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  APP_URL = 'https://i-exam.herokuapp.com';

  
  
  constructor(private http: HttpClient) { }

  getProfile(userId: number): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let url = `${this.APP_URL}/test`;
    return this.http.get(url, requestOptions);
  }
}
