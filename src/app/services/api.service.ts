import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../model/category.model';
import { ResponseObject } from '../model/response.model';
import { Item, ItemVariant, Pageable, PageableContent } from '../model/item.model';
import { ItemCriteria } from '../model/item-criteria.model';
import { MediaType } from '../model/media-type.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public url = environment.apiUrl;
  public cdnUrl = environment.cdnUrl;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<ResponseObject<Category[]>> {
    return this.http.get<ResponseObject<Category[]>>(`${this.url}/api/item/v1/categories?flat=true`);
  }

  getItemsForCategory(categoryId: number): Observable<ResponseObject<PageableContent<Item>>> {
    return this.http.get<ResponseObject<PageableContent<Item>>>(`${this.url}/api/item/v1/items?categoryId=${categoryId}`);
  }

  saveCategory(category: Category): Observable<ResponseObject<Category>> {
    return this.http.post<ResponseObject<Category>>(`${this.url}/api/item/v1/categories`, category);
  }

  updateCategory(categoryId: number, category: Category): Observable<ResponseObject<Category>> {
    return this.http.put<ResponseObject<Category>>(`${this.url}/api/item/v1/categories/${categoryId}`, category);
  }

  saveItem(item: Item): Observable<ResponseObject<Item>> {
    return this.http.post<ResponseObject<Item>>(`${this.url}/api/item/v1/items`, item);
  }

  updateItem(itemId: number, item: Item): Observable<ResponseObject<Item>> {
    return this.http.put<ResponseObject<Item>>(`${this.url}/api/item/v1/items/${itemId}`, item);
  }

  saveItemVariant(itemId: number, itemVariant: ItemVariant): Observable<ResponseObject<ItemVariant>> {
    return this.http.post<ResponseObject<ItemVariant>>(`${this.url}/api/item/v1/items/${itemId}/variants`, itemVariant);
  }

  updateItemVariant(itemVariantId: number, itemId: number, itemVariant: ItemVariant): Observable<ResponseObject<ItemVariant>> {
    return this.http.put<ResponseObject<ItemVariant>>(`${this.url}/api/item/v1/items/${itemId}/variants/${itemVariantId}`, itemVariant);
  }

  uploadCategoryThumbnail(categoryId: number, fileList: FileList): Observable<any> {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      return this.http.post(`${this.url}/api/item/v1/categories/${categoryId}/thumbnail`, formData, options);
    }
  }

  getAllItems(criteria: ItemCriteria): Observable<ResponseObject<PageableContent<Item>>> {
    let params = new HttpParams();
    if (criteria) {
      params = !criteria.categoryId ? params : params.append("categoryId", criteria.categoryId.toString());
      params = !criteria.page ? params : params.append("page", criteria.page.toString());
      params = !criteria.pageSize ? params : params.append("pageSize", criteria.pageSize.toString());
      params = !criteria.sortField ? params : params.append("sortField", criteria.sortField);
      params = !criteria.sortDirection ? params : params.append("sortDirection", criteria.sortDirection);
    }
    return this.http.get<ResponseObject<PageableContent<Item>>>(`${this.url}/api/item/v1/items`, { params: params });
  }


  uploadItemThumbnail(itemId: number, fileList: FileList): Observable<any> {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      return this.http.post(`${this.url}/api/item/v1/items/${itemId}/thumbnail`, formData, options);
    }
  }

  uploadItemMedia(itemId: number, mediaType: MediaType, fileList: FileList): Observable<any> {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      return this.http.post(`${this.url}/api/item/v1/items/${itemId}/media?mediaType=${mediaType}`, formData, options);
    }
  }

  uploadItemVariantThumbnail(itemVariantId: number, fileList: FileList): Observable<any> {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = { headers: headers };
      return this.http.post(`${this.url}/api/item/v1/items/variants/${itemVariantId}/thumbnail`, formData, options);
    }
  }
}
