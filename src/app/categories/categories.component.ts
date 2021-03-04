import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category = {
    id: null,
    name: null,
    description: null,
    thumbnail: null,
    subCategories: []
  };
  preselectedId: number;

  constructor(private api: ApiService) {
  }

  fetchCategories() {
    this.api.getAllCategories().subscribe(data => {
      this.categories = data.data;
      if (this.preselectedId) {
        this.selectedCategory = this.categories.filter(c => c.id == this.preselectedId)[0];
      } else if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0];
      }
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  categoryClicked(category: Category) {
    this.selectedCategory = category;
  }

  newCategory() {
    this.selectedCategory = {
      id: null,
      name: null,
      description: null,
      thumbnail: null,
      subCategories: []
    };
  }

  categoryChanged(category: Category) {
    this.preselectedId = category.id;
    this.fetchCategories();
  }
}
