import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  APP_URL = 'https://i-exam.herokuapp.com';

  constructor(private http: HttpClient) { }

  //GET APIs
  getUserDetailsById(userId: number) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmtpdCIsImV4cCI6MTYzMzgyNjk1NSwiaWF0IjoxNjMzNzkwOTU1fQ.PPmFE7CiT_0OoN6zVO-lRNYvY7G-uby_hZJBxnf2tRg'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let url = `${this.APP_URL}/users/${userId}`;
    let response =  this.http.get(url, requestOptions);
    console.log(response);
    return response;
  }

  
  //CREATE APIs
  
  registerUser(user: User) {
    return this.http.post(`${baseUrl}/users/`,user);
  }

  duplicateDataCheck(data: any){
    return this.http.post(`${baseUrl}/users/`,data);;
  }
  
  
  //UPDATE APIs
  updateUser(newUser: User, userId: number) {
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

    let url = `${this.APP_URL}/users/${userId}`;
    let response =  this.http.put(url, newUser, requestOptions);
    console.log(response);
    return response;
  }
  
  
  
  //DELETE APIs

  
}
