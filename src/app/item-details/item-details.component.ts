import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Category } from '../model/category.model';
import { Item, ItemVariant } from '../model/item.model';
import { MediaType } from '../model/media-type.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  private _item: Item;
  @Input()
  set item(val: Item) {
    this._item = val;
    this.selectedVariant = val.variants?.filter(v => v.id == this.selectedVariant?.id)[0];
    if (!this.selectedVariant && val.variants.length > 0) {
      this.selectedVariant = val.variants[0];
    }
  }

  get item(): Item {
    return this._item;
  }

  @Input()
  categories: Category[];
  @ViewChild('thumbnailPicker')
  thumbnailPicker: ElementRef;
  @ViewChild('mediaPicker')
  mediaPicker: ElementRef;

  cdnUrl = "";
  selectedVariant: ItemVariant;

  constructor(private api: ApiService) {
    this.cdnUrl = api.cdnUrl;
  }
  @Output()
  onItemChange = new EventEmitter<Item>();

  ngOnInit(): void {
  }

  variantSelected(variant: ItemVariant) {
    this.selectedVariant = variant;
  }

  variantChanged(variant: ItemVariant) {
    this.selectedVariant = variant;
    this.onItemChange.emit(this.item);
  }

  saveItem() {
    if (this.item.id > 0) {
      this.api.updateItem(this.item.id, this.item).subscribe(data => {
        if (data.success) {
          this.onItemChange.emit(data.data);
        }
      });
    } else {
      this.api.saveItem(this.item).subscribe(data => {
        if (data.success) {
          this.onItemChange.emit(data.data);
        }
      });
    }
  }

  fileChange(event) {
    if (this.item.id == null) {
      return;

    }
    let fileList: FileList = event.target.files;
    console.log(fileList);
    this.api.uploadItemThumbnail(this.item.id, fileList).subscribe(data => {
      this.thumbnailPicker.nativeElement.value = "";
      this.onItemChange.emit(this.item);
    });
  }

  newMediaFile(event) {
    if (this.item.id == null) {
      return;

    }
    let fileList: FileList = event.target.files;
    console.log(fileList);
    this.api.uploadItemMedia(this.item.id, MediaType.Image, fileList).subscribe(data => {
      this.mediaPicker.nativeElement.value = "";
      this.onItemChange.emit(this.item);
    });
  }
}
