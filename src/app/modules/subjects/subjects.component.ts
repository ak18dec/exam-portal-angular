import { Component, OnInit, ViewChild } from '@angular/core';

import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatSort } from '@angular/material/sort';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  subjects: Subject[]=[];

  columns: string[] = ['id','title', 'enabled', 'action']

  animal: string;
  name: string;

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  newSubjectData: Subject = {
      id: -1,
      title: '',
      enabled: true
  }

  constructor(public dialog: MatDialog, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.getAllSubjects();
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '300px',
      data: Object.assign({},this.newSubjectData)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result !== ""){
        const sameData = this.validateSubject(this.newSubjectData, result);
        if(!sameData){
          this.createSubject(result);
        }

      }
    });
  }

  validateSubject(sub1: Subject, sub2: Subject): boolean {
    let sameTitle = false;
    if(sub1 && sub2){
      if(sub1.title !== '' && sub2.title !== '' && sub1.title === sub2.title){
        sameTitle = true;
      }
    }
    return sameTitle;
  }

  deleteSubject(data: any){
    this.subjectService.deleteSubject(data.id).subscribe(
      (res)=>{
        if(res){
          let idxToDelete = this.subjects.findIndex(s => s.id === data.id);
          this.subjects.splice(idxToDelete, 1);
          this.dataSource._updateChangeSubscription();

          // this._snackBar.open(`Subject removed successfully`,'',{
          //   duration: 3000
          // });
          // this.freshForm();
        }
      },
      (error)=>{
        // this._snackBar.open(error,'',{
        //   duration: 3000
        // });
        console.log(error);
      }
    );
  }

  getAllSubjects() {
    this.subjectService.getSubjects().subscribe(
      (res: any) => {
        this.subjects = res;
        this.dataSource = new MatTableDataSource(this.subjects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        // this._snackBar.open('Error while fetching subjects list','',{
        //   duration: 3000
        // });
        console.log(error);
      } 
    )
  }

  createSubject(data: Subject){
    this.subjectService.addSubject(data).subscribe(
      (data)=>{
        this.subjects.push(data);
        this.newSubjectData = {
          id: -1,
          title: '',
          enabled: true
        }
        this.dataSource._updateChangeSubscription();
        
        // this._snackBar.open(`${this.newSubjectData.title} is added successfully to list`,'',{
        //   duration: 3000
        // });

        // this.freshForm();
      },
      (error)=>{
        // this._snackBar.open(error,'',{
        //   duration: 3000
        // });
        console.log(error);
      }
    )
  }


  openEditDialog(editableRow:any) {

    let dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '300px',
      data: Object.assign({},editableRow)
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result && result !== ""){
        const sameData = this.validateSubject(editableRow, result) && (editableRow.enabled === result.enabled);
        if(!sameData){
          this.updateSubject(result);
        }
      }
    });
    
  }

  updateSubject(data: Subject){
    this.subjectService.updateSubject(data, data.id).subscribe(
      (res)=>{
        if(res) {
          let idxToUpdate = this.subjects.findIndex(g=>g.id === data.id);
          this.subjects[idxToUpdate].title = data.title;
          this.subjects[idxToUpdate].enabled = data.enabled;
          
          // this._snackBar.open('Subject updated successfully','',{
          //   duration: 3000
          // });
  
          // this.freshForm();
          this.dataSource._updateChangeSubscription();
        }
      },
      (error)=>{
        // this._snackBar.open(error,'',{
        //   duration: 3000
        // });
        console.log(error);
      }
    )
  }

  
}