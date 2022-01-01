import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Instruction } from 'src/app/models/instruction';
import { InstructionService } from 'src/app/services/instruction.service';

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

  constructor(private instructionService: InstructionService) { }

  ngOnInit(): void {
    this.getAllInstructions();
  }

  getAllInstructions() {
    this.instructionService.getInstructions().subscribe(
      (res: any) => {
        this.instructions = res;
        this.dataSource = new MatTableDataSource(this.instructions);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        // this._snackBar.open('Error while fetching questions list','',{
        //   duration: 3000
        // });
        console.log(error);
      } 
    )
  }


  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteInstruction(data: any){
    this.instructionService.deleteInstruction(data.id).subscribe(
      (res: any) => {
        if(res){
          let idxToDelete = this.instructions.findIndex(u => u.id === data.id);
          this.instructions.splice(idxToDelete, 1);
          this.dataSource._updateChangeSubscription();

          // this._snackBar.open(`User removed successfully`,'',{
          //   duration: 3000
          // });
          // this.freshForm();
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }


}
