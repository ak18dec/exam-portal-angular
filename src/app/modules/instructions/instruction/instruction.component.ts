import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Instruction } from 'src/app/models/instruction';

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

  constructor() { }

  ngOnInit(): void {
  }

}
