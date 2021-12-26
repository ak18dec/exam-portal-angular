import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent implements OnInit {

  newSubject: Subject;

  constructor(public dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subject) { }

  ngOnInit(): void {
    this.newSubject = this.data;
  }

  addNewSubject(form: NgForm){
    this.newSubject.title = form.value.title;
    this.newSubject.description = form.value.description;
    this.newSubject.enabled = form.value.enabled === true ? true : false;

    this.dialogRef.close(this.newSubject);
  }

  onSubjectStatusSelect() { }

}
