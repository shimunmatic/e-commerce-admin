import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { ItemCriteria } from '../model/item-criteria.model';
import { Item, PageableContent } from '../model/item.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemCriteria: ItemCriteria;
  categories: Category[];
  items: Item[];
  selectedItem: Item = {
    id: null,
    name: null,
    description: null,
    thumbnail: null,
    basePrice: null,
    categoryId: null,
    variants: [],
    itemMedia: [],
  };
  preselectedId: number;
  pageContent: PageableContent<Item>;

  constructor(private api: ApiService) {
  }

  fetchItems(criteria: ItemCriteria) {

    this.api.getAllItems(criteria).subscribe(data => {
      this.items = data.data.content;
      this.pageContent = data.data;
      if (this.preselectedId) {
        this.selectedItem = this.items.filter(i => i.id == this.preselectedId)[0];
      } else if (this.items.length > 0) {
        this.selectedItem = this.items[0];
      }
    });
  }

  fetchCategories() {
    this.api.getAllCategories().subscribe(data => this.categories = data.data);
  }

  ngOnInit(): void {
    this.itemCriteria = new ItemCriteria();
    this.itemCriteria.sortField = "name";
    this.itemCriteria.sortDirection = "ASC";
    this.fetchItems(this.itemCriteria);
    this.fetchCategories();
  }

  itemClicked(item: Item) {
    this.selectedItem = item;
  }

  newItem() {
    this.selectedItem = {
      id: null,
      name: null,
      description: null,
      thumbnail: null,
      basePrice: null,
      categoryId: null,
      variants: [],
      itemMedia: [],
    };
  }

  itemChanged(item: Item) {
    this.preselectedId = item.id;
    console.log("item changed");
    this.fetchItems(this.itemCriteria);
  }
}
