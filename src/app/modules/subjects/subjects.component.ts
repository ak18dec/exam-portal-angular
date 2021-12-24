import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'src/app/models/subject';
import { GenreService } from 'src/app/services/genre.service';
import { SubjectService } from 'src/app/services/subject.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  // newSubject: boolean = false;
  // addBtnClicked: boolean = false;
  // subjects: Subject[] = [];
  // genresList: any[] = [];

  // newSubjectData: Subject = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   genreId: 0,
  //   enabled: true
  // }

  // constructor(private _snackBar: MatSnackBar, private subjectService: SubjectService, private genreService: GenreService) { }

  // ngOnInit() {
  //   this.freshForm();
  //   this.getAllSubjects();
  //   this.genresList.length = 0;
  //   this.genreService.getGenres().subscribe(
  //     (data: any)=>{
  //       data.forEach((d: { id: any; title: any; enabled: any; })=> {
  //         if(d.enabled){
  //           this.genresList.push({id: d.id, label: d.title, enabled: d.enabled});
  //         }
  //       });
  //     },
  //     (error)=>{
  //       this._snackBar.open('Error while fetching genres list','',{
  //         duration: 3000
  //       });
  //     }
  //   );
  // }

  // getAllSubjects() {
  //   this.subjectService.getSubjects().subscribe(
  //     (res: any) => {
  //       this.subjects = res;
  //     },
  //     (error) => {
  //       this._snackBar.open('Error while fetching subjects list','',{
  //         duration: 3000
  //       });
  //     } 
  //   )
  // }

  // freshForm(){
  //   this.newSubject = false;
  //   this.addBtnClicked = false;
  //   this.newSubjectData.id = 0
  //   this.newSubjectData.title = '';
  //   this.newSubjectData.description = '';
  //   this.newSubjectData.genreId = 0;
  //   this.newSubjectData.enabled = true;
  // }

  // addSubject() {
  //   this.freshForm();
  //   this.newSubject = true;
  //   this.addBtnClicked = true;
  // }

  // backToSubjects(){
  //   this.freshForm();
  // }

  // editSubject(editableSubject: Subject){
  //   this.newSubject = true;
  //   this.addBtnClicked = false;
  //   this.newSubjectData.title = editableSubject.title;
  //   this.newSubjectData.description = editableSubject.description;
  //   this.newSubjectData.id = editableSubject.id;
  //   this.newSubjectData.enabled = editableSubject.enabled;
  //   this.newSubjectData.genreId = editableSubject.genreId;
  // }

  // deleteSubject(id: number){
  //   this.subjectService.deleteSubject(id).subscribe(
  //     (res)=>{
  //       if(res){
  //         let idxToDelete = this.subjects.findIndex(s => s.id === id);
  //         this.subjects.splice(idxToDelete, 1);

  //         this._snackBar.open(`Subject removed successfully`,'',{
  //           duration: 3000
  //         });
  //         this.freshForm();
  //       }
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   );
  // }

  // toggleSubjectStatus(id: number, idx: number){

  //   let oldState = this.subjects[idx].enabled;
  //   this.subjects[idx].enabled = !oldState;

  //   this.subjectService.toggleSubjectState(this.subjects[idx],id).subscribe(
  //     (res) => {
  //       if (res) {
  //         let status = this.subjects[idx].enabled ? 'enabled' : 'disabled';
  //         this._snackBar.open(`Subject ${status} successfully`, '', {
  //           duration: 3000
  //         });
  //       }
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   )
  // }

  // submitForm(subjectForm: any) {
    
  //   if(!this.newSubjectData.title){
  //     this._snackBar.open('Please provide subject title','',{
  //       duration: 3000
  //     });
  //     return;
  //   }

  //   if(this.addBtnClicked){
  //     this.createSubject();
  //   }else{
  //     this.updateSubject();
  //   }
    
  // }

  // updateSubject(){

  //   this.subjectService.updateSubject(this.newSubjectData, this.newSubjectData.id).subscribe(
  //     (data)=>{
  //       if(data) {
  //         let idxToUpdate = this.subjects.findIndex(g=>g.id === this.newSubjectData.id);
  //         this.subjects[idxToUpdate].title = this.newSubjectData.title;
  //         this.subjects[idxToUpdate].description = this.newSubjectData.description;
  //         this.subjects[idxToUpdate].genreId = this.newSubjectData.genreId;
  //         this.subjects[idxToUpdate].enabled = this.newSubjectData.enabled;
          
  //         this._snackBar.open('Subject updated successfully','',{
  //           duration: 3000
  //         });
  
  //         this.freshForm();
  //       }
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   );

  // }

  // createSubject(){
  //   this.subjectService.addSubject(this.newSubjectData).subscribe(
  //     (data)=>{
  //       this.subjects.push(data);
  //       this._snackBar.open(`${this.newSubjectData.title} is added successfully to list`,'',{
  //         duration: 3000
  //       });

  //       this.freshForm();
  //     },
  //     (error)=>{
  //       this._snackBar.open(error,'',{
  //         duration: 3000
  //       });
  //     }
  //   )
  // }

  // getGenreName(genreId: number) {
  //   return this.genresList.find(g => g.id === genreId).label;
  // }

  dataSource: MatTableDataSource<any>;

  subjects: Subject[]=[];

  columns: string[] = ['id','title', 'description', 'genreId','enabled', 'action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {

    this.subjects = [
      {
        id: 1,
        title: 'Mathematics',
        description: 'Dummy Text',
        genreId: 3,
        enabled: true
      },
      {
        id: 2,
        title: 'History',
        description: 'Dummy Text',
        genreId: 1,
        enabled: true
      },
      {
        id: 3,
        title: 'Dance',
        description: 'Dummy Text',
        genreId: 2,
        enabled: true
      }
    ]
   
    this.dataSource = new MatTableDataSource(this.subjects);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
