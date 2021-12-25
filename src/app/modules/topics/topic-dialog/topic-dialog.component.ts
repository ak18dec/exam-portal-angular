import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent implements OnInit {

  subjects: Subject[] = [];

  constructor(public dialogRef: MatDialogRef<TopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.subjects = [
      {
        id: 1,
        title: 'Maths',
        description:'sgdgd',
        enabled: true
      },
      {
        id: 2,
        title: 'Arts',
        description:'sgdgd',
        enabled: true
      },
      {
        id: 3,
        title: 'Science',
        description:'sgdgd',
        enabled: true
      }
    ]
  }

}
