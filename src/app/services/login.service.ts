import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, retry, Subject } from 'rxjs';
import { User } from '../models/user';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //GET APIs
  
  public getToken(){
    return localStorage.getItem('token');
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    //let usr = this.getUser();
    // return usr.authorities[0].authority;
    return 'BASIC';
  }

  public isLoggedIn() {
    if(!localStorage.getItem('token')){
      return false;
    }
    return true;
  }


  //CREATE APIs

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public storeUser(user: any){
    let user_lite = {
      userId: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      enabled: user.enabled
    }
    localStorage.setItem('user',JSON.stringify(user_lite));
  }

  public storeToken(token: any){
    localStorage.setItem('token', token);
    return true;
  }

  
  //UPDATE APIs
  

  
  //DELETE APIs

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

}
