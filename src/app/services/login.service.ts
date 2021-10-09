import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User = {
    username: 'ankit21',
    password: 'abc123',
    firstName: 'Ankit',
    lastName: 'Kumar',
    email: 'ankit@gmail.com',
    phone: '9876543210'
  }

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //GET APIs
  
  public getToken(){
    // return localStorage.getItem('token');
  }

  public getUser(){
    // let userStr = localStorage.getItem('user');
    // if(userStr){
    //   return JSON.parse(userStr);
    // }else{
    //   this.logout();
    //   return null;
    // }
  }

  public getUserRole() {
    //let usr = this.getUser();
    // return usr.authorities[0].authority;
    return 'ADMIN';
  }

  public getCurrentUser(){
    // return this.http.get(`${baseUrl}/current-user`);
    return of(this.user);
  }

  public isLoggedIn() {
    // if(!localStorage.getItem('token')){
    //   return false;
    // }
    return true;
  }


  //CREATE APIs

  public generateToken(loginData: any) {
    // return this.http.post(`${baseUrl}/generate-token`,loginData);
    const obsof4 = of({token:'Hello'});
    return obsof4;
  }

  public storeUser(user: any){
    // localStorage.setItem('user',JSON.stringify(user));
  }

  public storeToken(token: any){
    // localStorage.setItem('token', token);
    return true;
  }

  
  //UPDATE APIs
  

  
  //DELETE APIs

  public logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    return true;
  }

}
