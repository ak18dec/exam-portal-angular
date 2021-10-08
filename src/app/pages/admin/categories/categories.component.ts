import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  newCategory: boolean = false;

  addBtnClicked: boolean = false;
  categories: any[] = [];
  subjectsList: any[] = [];

  newCategoryData: any = {
    id: 0,
    title: '',
    description: '',
    subjectId: 0,
    enabled: true
  }

  constructor() { }

  ngOnInit() {
    this.freshForm();
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
    this.newCategoryData.genreId = editableCategory.subjectId;
  }

  deleteCategory(id: number){
    // this.subjectService.deleteSubject(id).subscribe(
    //   (res)=>{
    //     this.subjects = res;
    //     this._snackBar.open(`Subject removed successfully`,'',{
    //       duration: 3000
    //     });
    //     this.freshForm();
    //   },
    //   (error)=>{
    //     this._snackBar.open(error,'',{
    //       duration: 3000
    //     });
    //   }
    // );
  }

  toggleCategoryStatus(id: number, idx: number){
    // this.subjectService.toggleSubjectState(id).subscribe(
    //   (res)=>{
    //     this.subjects = res;
    //     let status = this.subjects[idx].enabled ? 'enabled' : 'disabled';
    //     this._snackBar.open(`Subject ${status} successfully`,'',{
    //       duration: 3000
    //     });
    //   },
    //   (error)=>{
    //     this._snackBar.open(error,'',{
    //       duration: 3000
    //     });
    //   }
    // )
  }

  submitForm(categoryForm) {
    // console.log(this.newSubjectData);
    
    // if(!this.newSubjectData.title){
    //   this._snackBar.open('Please provide subject title','',{
    //     duration: 3000
    //   });
    //   return;
    // }

    // //if genre is inactive then subject will automatically become inactive
    // let genreStatus = this.genresList.find(g=> g.id === this.newSubjectData.genreId).enabled;
    // if(!genreStatus){
    //   this.newSubjectData.enabled = false;
    // }else{
    //   this.newSubjectData.enabled = true;
    // }

    // if(this.addBtnClicked){
    //   this.createSubject();
    // }else{
    //   this.updateSubject();
    // }
    
  }

}
