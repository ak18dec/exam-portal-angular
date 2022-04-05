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
  getUserDetailsById(userId: number) {
    let url = `${baseUrl}/users/${userId}`;
    let response =  this.http.get(url);
    // console.log(response);
    return response;
  }

  getUserByUsernameOrEmail(usernameOrEmail: string) {
    let url = '';
    if(usernameOrEmail.includes('@')){
      url = `${baseUrl}/users?email=${usernameOrEmail}&username=`;
    }else {
      url = `${baseUrl}/users?username=${usernameOrEmail}&email=`;
    }
    let response =  this.http.get(url);
    // console.log(response);
    return response;
  }

  getUserByEmail(email: string) {
    let url = `${baseUrl}/users?email=${email}`;
    let response =  this.http.get(url);
    // console.log(response);
    return response;
  }

  getUsers(){
    return this.http.get(`${baseUrl}/users/`);
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
    let url = `${baseUrl}/users/${userId}`;
    let response =  this.http.put(url, newUser);
    // console.log(response);
    return response;
  }
  
  
  
  //DELETE APIs
  deleteUser(userId: number){
    return this.http.delete(`${baseUrl}/users/${userId}`);
  }
  
}
