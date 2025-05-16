import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';

@Component({
    selector: 'app-category-dialog',
    templateUrl: './category-dialog.component.html',
    styleUrls: ['./category-dialog.component.scss'],
    standalone: false
})
export class CategorytDialogComponent implements OnInit {

  newCategory: Category;

  constructor(public dialogRef: MatDialogRef<CategorytDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
    this.newCategory = this.data;
  }

  addNewCategory(form: NgForm){
    this.newCategory.label = form.value.title;
    this.newCategory.enabled = form.value.enabled === true ? true : false;

    this.dialogRef.close(this.newCategory);
  }

  onCategoryStatusSelect() { }

}
