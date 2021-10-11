import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'src/app/models/subject';
import { GenreService } from 'src/app/services/genre.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  newSubject: boolean = false;
  addBtnClicked: boolean = false;
  subjects: Subject[] = [];
  genresList: any[] = [];

  newSubjectData: Subject = {
    id: 0,
    title: '',
    description: '',
    genreId: 0,
    enabled: true
  }

  constructor(private _snackBar: MatSnackBar, private subjectService: SubjectService, private genreService: GenreService) { }

  ngOnInit() {
    this.freshForm();
    this.getAllSubjects();
    this.genresList.length = 0;
    this.genreService.getGenres().subscribe(
      (data)=>{
        // data.forEach(d=>this.genresList.push({id: d.id, label: d.title, enabled: d.enabled}));
      },
      (error)=>{
        this._snackBar.open('Error while fetching genres list','',{
          duration: 3000
        });
      }
    );
  }

  getAllSubjects() {
    this.subjectService.getSubjects().subscribe(
      (res) => {
        this.subjects = res;
      },
      (error) => {
        this._snackBar.open('Error while fetching subjects list','',{
          duration: 3000
        });
      } 
    )
  }

  freshForm(){
    this.newSubject = false;
    this.addBtnClicked = false;
    this.newSubjectData.id = 0
    this.newSubjectData.title = '';
    this.newSubjectData.description = '';
    this.newSubjectData.genreId = 0;
    this.newSubjectData.enabled = true;
  }

  addSubject() {
    this.freshForm();
    this.newSubject = true;
    this.addBtnClicked = true;
  }

  backToSubjects(){
    this.freshForm();
  }

  editSubject(editableSubject: Subject){
    this.newSubject = true;
    this.addBtnClicked = false;
    this.newSubjectData.title = editableSubject.title;
    this.newSubjectData.description = editableSubject.description;
    this.newSubjectData.id = editableSubject.id;
    this.newSubjectData.enabled = editableSubject.enabled;
    this.newSubjectData.genreId = editableSubject.genreId;
  }

  deleteSubject(id: number){
    this.subjectService.deleteSubject(id).subscribe(
      (res)=>{
        this.subjects = res;
        this._snackBar.open(`Subject removed successfully`,'',{
          duration: 3000
        });
        this.freshForm();
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );
  }

  toggleSubjectStatus(id: number, idx: number){
    this.subjectService.toggleSubjectState(id).subscribe(
      (res)=>{
        this.subjects = res;
        let status = this.subjects[idx].enabled ? 'enabled' : 'disabled';
        this._snackBar.open(`Subject ${status} successfully`,'',{
          duration: 3000
        });
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    )
  }

  submitForm(subjectForm: any) {
    console.log(this.newSubjectData);
    
    if(!this.newSubjectData.title){
      this._snackBar.open('Please provide subject title','',{
        duration: 3000
      });
      return;
    }

    //if genre is inactive then subject will automatically become inactive
    let genreStatus = this.genresList.find(g=> g.id === this.newSubjectData.genreId).enabled;
    if(!genreStatus){
      this.newSubjectData.enabled = false;
    }else{
      this.newSubjectData.enabled = true;
    }

    if(this.addBtnClicked){
      this.createSubject();
    }else{
      this.updateSubject();
    }
    
  }

  updateSubject(){

    this.subjectService.updateSubject(this.newSubjectData).subscribe(
      (data)=>{
        this.subjects = data;
        this._snackBar.open('Subject updated successfully','',{
          duration: 3000
        });

        this.freshForm();

      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );

  }

  createSubject(){
    this.subjectService.addSubject(this.newSubjectData).subscribe(
      (res)=>{
        this.subjects = res;
        this._snackBar.open(`${this.newSubjectData.title} is added successfully to list`,'',{
          duration: 3000
        });

        this.freshForm();
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    )
  }

  getGenreName(genreId: number) {
    return this.genresList.find(g => g.id === genreId).label;
  }

}
