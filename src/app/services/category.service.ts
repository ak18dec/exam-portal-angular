import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category';
import { categories } from '../data/categories/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = signal<Category[]>(categories);

  constructor() { }

  //GET APIs
  public getCategories() {
    return this.categories();
  }

  //CREATE APIs

  public addCategory(category: Category): void {
    this.categories.set([...this.categories(), category])
  }

  //UPDATE APIs

  public updateCategory(category: Category, id: number): void {
    this.categories.set([...this.categories(), {
      id: category.id,
      label: category.label,
      enabled: category.enabled
    }])

  }

  public toggleCategoryState(category: Category, id: number): void {
    this.categories.set([...this.categories(), {
      id: category.id,
      label: category.label,
      enabled: category.enabled
    }])
    
  }

  //DELETE APIs
  public deleteCategory(id: number): void {
    // this.categories.set(this.categories().filter(c => c.id !== id));
  }

}
