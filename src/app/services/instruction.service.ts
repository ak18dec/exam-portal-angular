import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instruction } from '../models/instruction';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(private http: HttpClient) { }

  //GET APIs
  public getInstructions() {
    let url = `${baseUrl}/instructions/`;
    return this.http.get<Instruction>(url);
  }

  public getInstructionById(id: number) {
    let url = `${baseUrl}/instructions/${id}`;
    let response =  this.http.get(url);
    return response;
  }

    //CREATE APIs

    public addInstruction(newInstruction: Instruction){
      let instr: Instruction = {
        id: -1,
        content: '',
        enabled: true
      }
  
      instr.content = newInstruction.content;
      instr.enabled = newInstruction.enabled;
  
      let url = `${baseUrl}/instructions/`;
  
      return this.http.post<Instruction>(url, instr);
      
    }

  //UPDATE APIs

  public updateInstruction(editIns: Instruction, id: number){
    let url = `${baseUrl}/instructions/${id}`;
    return this.http.put<boolean>(url, editIns);
  }


  //DELETE APIs

  public deleteInstruction(id: number){
    let url = `${baseUrl}/instructions/${id}`;
    return this.http.delete<boolean>(url);
  }

}
