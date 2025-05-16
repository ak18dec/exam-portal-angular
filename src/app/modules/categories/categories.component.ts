import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';

import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { CategorytDialogComponent } from './category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: false
})
export class CategoryComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  categories: Category[]=[];

  columns: string[] = ['id','label', 'enabled', 'action']

  animal: string;
  name: string;

  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  newCategoryData: Category = {
      id: -1,
      label: '',
      enabled: true
  }

  constructor(public dialog: MatDialog, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CategorytDialogComponent, {
      width: '300px',
      data: Object.assign({},this.newCategoryData)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result !== ""){
        const sameData = this.validateCategory(this.newCategoryData, result);
        if(!sameData){
          this.createSubject(result);
        }

      }
    });
  }

  validateCategory(category1: Category, category2: Category): boolean {
    let sameTitle = false;
    if(category1 && category2){
      if(category1.label !== '' && category2.label !== '' && category1.label === category2.label){
        sameTitle = true;
      }
    }
    return sameTitle;
  }

  deleteSubject(data: any){
    // this.categoryService.deleteCategory(data.id).subscribe(
    //   (res)=>{
    //     if(res){
    //       let idxToDelete = this.categories.findIndex(s => s.id === data.id);
    //       this.categories.splice(idxToDelete, 1);
    //       this.dataSource._updateChangeSubscription();

    //       // this._snackBar.open(`Category removed successfully`,'',{
    //       //   duration: 3000
    //       // });
    //       // this.freshForm();
    //     }
    //   },
    //   (error)=>{
    //     // this._snackBar.open(error,'',{
    //     //   duration: 3000
    //     // });
    //     console.log(error);
    //   }
    // );
  }

  getAllCategories() {
    this.categories = this.categoryService.getCategories();
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.categoryService.getCategories().subscribe(
    //   (res: any) => {
    //     this.categories = res;
    //     this.dataSource = new MatTableDataSource(this.categories);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   (error) => {
    //     // this._snackBar.open('Error while fetching categories list','',{
    //     //   duration: 3000
    //     // });
    //     console.log(error);
    //   } 
    // )
  }

  createSubject(data: Category){
    // this.categoryService.addCategory(data).subscribe(
    //   (data)=>{
    //     this.categories.push(data);
    //     this.newCategoryData = {
    //       id: -1,
    //       label: '',
    //       enabled: true
    //     }
    //     this.dataSource._updateChangeSubscription();
        
    //     // this._snackBar.open(`${this.newSubjectData.title} is added successfully to list`,'',{
    //     //   duration: 3000
    //     // });

    //     // this.freshForm();
    //   },
    //   (error)=>{
    //     // this._snackBar.open(error,'',{
    //     //   duration: 3000
    //     // });
    //     console.log(error);
    //   }
    // )
  }


  openEditDialog(editableRow:any) {

    let dialogRef = this.dialog.open(CategorytDialogComponent, {
      width: '300px',
      data: Object.assign({},editableRow)
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result && result !== ""){
        const sameData = this.validateCategory(editableRow, result) && (editableRow.enabled === result.enabled);
        if(!sameData){
          // this.updateCategory(result);
        }
      }
    });
    
  }

  updateCategory(data: Category){
    // this.categoryService.updateCategory(data, data.id).subscribe(
    //   (res)=>{
    //     if(res) {
    //       let idxToUpdate = this.categories.findIndex(g=>g.id === data.id);
    //       this.categories[idxToUpdate].title = data.title;
    //       this.categories[idxToUpdate].enabled = data.enabled;
          
    //       // this._snackBar.open('Category updated successfully','',{
    //       //   duration: 3000
    //       // });
  
    //       // this.freshForm();
    //       this.dataSource._updateChangeSubscription();
    //     }
    //   },
    //   (error)=>{
    //     // this._snackBar.open(error,'',{
    //     //   duration: 3000
    //     // });
    //     console.log(error);
    //   }
    // )
  }

  
}