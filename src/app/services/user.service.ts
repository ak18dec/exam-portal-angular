import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //GET APIs


  
  //CREATE APIs
  
  registerUser(user: User) {
    return this.http.post(`${baseUrl}/users/`,user);
  }

  duplicateDataCheck(data: any){
    return this.http.post(`${baseUrl}/users/`,data);;
  }
  
  
  //UPDATE APIs
  
  
  
  //DELETE APIs

  
}
