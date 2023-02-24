import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../models/CategoryModel";
import {AccountModel} from "../models/AccountModel";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpClient: HttpClient = inject(HttpClient)
  url: string = "http://localhost:8080/categories"

  public getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.url, {withCredentials: true})
  }

  public insertCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.url, category, {withCredentials: true})
  }

  public getCategoryById(categoryId: number): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(this.url + '/' + categoryId, {withCredentials: true})
  }

  public updateCategory(categoryId: number, category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.put<CategoryModel>(this.url + '/' + categoryId, category, {withCredentials: true})
  }

  public deleteCategory(categoryId: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + categoryId, {withCredentials: true})
  }

}
