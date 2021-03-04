import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  @Input()
  category: Category = {
    id: null,
    name: null,
    description: null,
    thumbnail:null,
    subCategories: []
  };
  @Input()
  categories: Category[];
  cdnUrl = "";

  constructor(private api: ApiService, private http: HttpClient) {
    this.cdnUrl = api.cdnUrl;

   }
  @Output()
  onCategoryChange = new EventEmitter<Category>();

  ngOnInit(): void {
  }
  saveCategory() {
    this.api.saveCategory(this.category).subscribe(data => {
      if (data.success) {
        this.onCategoryChange.emit(data.data);
      } else {
        console.log(data.errorMessage);
      }
    }, (error) => console.log(error));
  }

  fileChange(event) {
    if (this.category.id == null) {
      return;

    } 
    let fileList: FileList = event.target.files;
    console.log(fileList);
    this.api.uploadCategoryThumbnail(this.category.id, fileList).subscribe(data => {
      this.onCategoryChange.emit(this.category);
    });
  }
}