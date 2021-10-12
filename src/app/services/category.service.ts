import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //GET APIs

  public getCategories(): Observable<Category> {
    let url = `${baseUrl}/categories/`;
    return this.http.get<Category>(url);
  }

  public getCategory() {

  }

  public getCategoriesBySubject() {

  }

  public getCategoryBySubject() {

  }



  //CREATE APIs

  public addCategory(newCategory: Category) {
    let category: Category = {
      id: 0,
      title: '',
      description: '',
      subjectId: 0,
      enabled: true
    }

    category.title = newCategory.title;
    category.description = newCategory.description;
    category.subjectId = newCategory.subjectId;
    category.enabled = newCategory.enabled;

    let url = `${baseUrl}/categories/`;

    return this.http.post<Category>(url, category);

  }

  public addCategories() {

  }



  //UPDATE APIs

  public updateCategory(editCateg: Category, id: number) {
    let url = `${baseUrl}/categories/${id}`;
    return this.http.put<boolean>(url, editCateg);
  }

  public toggleCategoryState(toggledCateggory: Category, id: number) {
    return this.updateCategory(toggledCateggory, id);
  }

  public toggleCategoriesState() {

  }

  public toggleCategroyBySubject() {

  }

  public toggleCategoriesBySubject() {

  }



  //DELETE APIs

  public deleteCategory(id: number) {
    let url = `${baseUrl}/categories/${id}`;
    return this.http.delete<boolean>(url);
  }

  public deleteAllCategories() {

  }

  public deleteCategoryBySubject() {

  }

  public deleteCategoriesBySubject() {

  }


}
