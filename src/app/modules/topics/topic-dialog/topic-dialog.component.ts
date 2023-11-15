import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject } from 'src/app/models/subject';
import { Topic } from 'src/app/models/topic';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent implements OnInit {

  subjects: Subject[] = [];
  newTopic: Topic;
  selectedSubject = -1;

  constructor(public dialogRef: MatDialogRef<TopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.newTopic = this.data;
    this.getSubjects();
  }

  addNewTopic(form: NgForm){
    this.newTopic.title = form.value.title;
    this.newTopic.subjectId = form.value.subjectId;
    this.newTopic.enabled = form.value.enabled === true ? true : false;

    this.dialogRef.close(this.newTopic);
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(
      (res: any) => {
        this.subjects = res;
      }
    )
  }

  onSubjectSelect () { }

  onTopicStatusSelect() { }

}
