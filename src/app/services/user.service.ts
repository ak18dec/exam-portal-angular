import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //GET APIs
  getUserDetailsById(userId: number, token: any) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Authorization' : `Bearer ${token}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let url = `${baseUrl}/users/${userId}`;
    let response =  this.http.get(url, requestOptions);
    console.log(response);
    return response;
  }

  getUserByUsername(username: string, token: any) {
    console.log('inside getuserbyusername; checking token value')
    console.log(token)
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Authorization' : `Bearer ${token}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let url = `${baseUrl}/users?username=${username}`;
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
  updateUser(newUser: User, userId: number, token: any) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Authorization' : `Bearer ${token}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let url = `${baseUrl}/users/${userId}`;
    let response =  this.http.put(url, newUser, requestOptions);
    console.log(response);
    return response;
  }
  
  
  
  //DELETE APIs

  
}
