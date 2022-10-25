import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getForgotPasswordLink(registeredEmail: string) {
    const payload = {
      email : registeredEmail
    }
    const url = `${baseUrl}/forgot-password`;
    return this.http.post(url, payload);
  }

  passwordReset(payload: any) {
    const url = `${baseUrl}/password-reset`
    return this.http.post(url, payload);
  }
}
