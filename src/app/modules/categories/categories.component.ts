import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  newCategory: boolean = false;
  addBtnClicked: boolean = false;
  categories: Category[] = [];
  subjectsList: any[] = [];

  newCategoryData: any = {
    id: 0,
    title: '',
    description: '',
    subjectId: 0,
    enabled: true
  }

  constructor(private _snackBar: MatSnackBar, private subjectService: SubjectService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.freshForm();
    this.getAllCategories();
    this.subjectsList.length = 0;
    this.subjectService.getSubjects().subscribe(
      (data: any) => {
        data.forEach((d: { id: any; title: any; enabled: any; }) => {
          if(d.enabled){
            this.subjectsList.push({id: d.id, label: d.title, enabled: d.enabled});
          }
        });
      },
      (error)=>{
        this._snackBar.open('Error while fetching subjects list','',{
          duration: 3000
        });
      }
    );
  }


  getAllCategories() {
    this.categoryService.getCategories().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (error) => {
        this._snackBar.open('Error while fetching categories list','',{
          duration: 3000
        });
      } 
    )
  }

  freshForm(){
    this.newCategory = false;
    this.addBtnClicked = false;
    this.newCategoryData.title = '';
    this.newCategoryData.id = 0
    this.newCategoryData.description = '';
    this.newCategoryData.subjectId = 0;
    this.newCategoryData.enabled = true;
  }

  backToCategories() {
    this.freshForm();
  }

  addCategory() {
    this.freshForm();
    this.newCategory = true;
    this.addBtnClicked = true;
  }

  editCategory(editableCategory: any){
    this.newCategory = true;
    this.addBtnClicked = false;
    this.newCategoryData.title = editableCategory.title;
    this.newCategoryData.description = editableCategory.description;
    this.newCategoryData.id = editableCategory.id;
    this.newCategoryData.enabled = editableCategory.enabled;
    this.newCategoryData.subjectId = editableCategory.subjectId;
  }

  deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(
      (res)=>{
        if(res){
          let idxToDelete = this.categories.findIndex(c => c.id === id);
          this.categories.splice(idxToDelete, 1);

          this._snackBar.open(`Category removed successfully`,'',{
            duration: 3000
          });
          this.freshForm();
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );
  }

  toggleCategoryStatus(id: number, idx: number){
    let oldState = this.categories[idx].enabled;
    this.categories[idx].enabled = !oldState;

    this.categoryService.toggleCategoryState(this.categories[idx],id).subscribe(
      (res) => {
        if (res) {
          let status = this.categories[idx].enabled ? 'enabled' : 'disabled';
          this._snackBar.open(`Category ${status} successfully`, '', {
            duration: 3000
          });
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    )
  }

  submitForm(categoryForm: any) {
    if(!this.newCategoryData.title){
      this._snackBar.open('Please provide category title','',{
        duration: 3000
      });
      return;
    }

    if(this.addBtnClicked){
      this.createCategory();
    }else{
      this.updateCategory();
    }
    
  }

  updateCategory(){

    this.categoryService.updateCategory(this.newCategoryData, this.newCategoryData.id).subscribe(
      (data)=>{
        if(data) {
          let idxToUpdate = this.categories.findIndex(c=>c.id === this.newCategoryData.id);
          this.categories[idxToUpdate].title = this.newCategoryData.title;
          this.categories[idxToUpdate].description = this.newCategoryData.description;
          this.categories[idxToUpdate].subjectId = this.newCategoryData.subjectId;
          this.categories[idxToUpdate].enabled = this.newCategoryData.enabled;
          
          this._snackBar.open('Category updated successfully','',{
            duration: 3000
          });
  
          this.freshForm();
        }
      },
      (error)=>{
        this._snackBar.open(error,'',{
          duration: 3000
        });
      }
    );

  }

  createCategory(){
    this.categoryService.addCategory(this.newCategoryData).subscribe(
      (data)=>{
        this.categories.push(data);
        this._snackBar.open(`${this.newCategoryData.title} is added successfully to list`,'',{
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

  getSubjectName(subjectId: number) {
    return this.subjectsList.find(s => s.id === subjectId).label;
  }

}
