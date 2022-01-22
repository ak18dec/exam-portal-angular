import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadImage(data: FormData) {
    return this.http.post(`${baseUrl}/file/upload`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
