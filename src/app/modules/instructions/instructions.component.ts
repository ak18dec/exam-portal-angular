import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Instruction } from 'src/app/models/instruction';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  

  dataSource: MatTableDataSource<any>;

  instructions: Instruction[]=[];

  columns: string[] = ['id','content', 'enabled', 'action']

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {

    this.instructions = [
      {
        id: 1,
        content: 'Test is of 30 mins',
        enabled: true
      },
      {
        id: 2,
        content: 'Quiz contains 120 questions',
        enabled: true
      },
      {
        id: 3,
        content: 'Use of calculator is not allowed',
        enabled: true
      }
    ]
   
    this.dataSource = new MatTableDataSource(this.instructions);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
