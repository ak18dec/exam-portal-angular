// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Quiz } from 'src/app/models/quiz';
@Component({
  selector: 'app-ep-table',
  templateUrl: './ep-table.component.html',
  styleUrls: ['./ep-table.component.scss']
})
export class EpTableComponent implements OnInit {

  @Input() data: any[] = [];
  
  dataSource: MatTableDataSource<any>;

  quizes: Quiz[]=[];

  columns: string[] = ['id', 'title', 'description', 'subject', 'topic', 'difficulty', 'questions', 'time', 'previousAttempts', 'action'];
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;


  constructor() { }
  ngOnInit(): void {
    console.log(this.data)
    this.setDataSource(this.data);
  }

  setDataSource(quizList: Quiz[]){
    this.dataSource = new MatTableDataSource(quizList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}