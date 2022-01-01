import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Instruction } from 'src/app/models/instruction';
import { InstructionService } from 'src/app/services/instruction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  public Editor = ClassicEditor;

  instruction: Instruction = {
    id: -1,
    content: '',
    enabled: false
  };

  editableInstruction: Instruction;
  addInstruction: boolean = false;
  dataLoaded: boolean = false;

  selectedInstructionId: number = -1;

  constructor(
    private route : ActivatedRoute, 
    private router: Router,
    private instructionService: InstructionService) { }

  ngOnInit() {
    if(this.router.url.includes('/new')){
      this.addInstruction = true;
    }else{
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(id){
          this.selectedInstructionId = id;
          this.getInstructionById(id);
        }
      })
    }
  }

  getInstructionById(instructionId: number){
    this.instructionService.getInstructionById(instructionId).subscribe(
      (res: any) => {
        if(this.selectedInstructionId === res.id){
          this.editableInstruction = res;
          this.initForm(this.editableInstruction);
          this.dataLoaded = true;
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  initForm(instruct: Instruction) {
    this.instruction = {
      id: instruct.id,
      content: instruct.content,
      enabled: instruct.enabled
    }
  }

  onFormSubmit(){
    if(this.addInstruction){
      this.createInstruction();
    }else{
      this.updateInstruction(this.instruction);
    }
  }

  createInstruction(){
    this.instructionService.addInstruction(this.instruction).subscribe(
      (data)=>{
        // this._snackBar.open(`${this.newQuestionData.title} is added successfully to list`,'',{
        //   duration: 3000
        // });
        this.resetForm();
        
      },
      (error)=>{
        // this._snackBar.open(JSON.stringify(error),'',{
        //   duration: 3000
        // });
        console.log(error)
      }
    )
  }

  resetForm(){
    this.instruction = {
      id: -1,
      content: '',
      enabled: false
    }
  }

  updateInstruction(data: Instruction){
    const editableInsId = this.editableInstruction.id;
    if(this.selectedInstructionId === editableInsId){
      const updatedIns: Instruction = {
        id: editableInsId,
        content: data.content,
        enabled: data.enabled
      }

      this.instructionService.updateInstruction(updatedIns, this.selectedInstructionId).subscribe(
        (res: any)=> {
          console.log(`Instruction Details Updated Successfully for Ins ID ${editableInsId} and Selected Ins ID ${this.selectedInstructionId}`)
        },
        (error) => {
          console.log(error)
        }
      )
    }else{
      console.log('Ins ID mismatched')
      console.log(this.selectedInstructionId)
      console.log(data)
    }
    
  }

  onStatusSelect() {}


}
