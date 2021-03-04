import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemVariant } from '../model/item.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-item-variant-details',
  templateUrl: './item-variant-details.component.html',
  styleUrls: ['./item-variant-details.component.css']
})
export class ItemVariantDetailsComponent implements OnInit {
  @Input()
  variant: ItemVariant = new ItemVariant();
  @Input()
  itemId: number;
  cdnUrl = "";
  constructor(private api: ApiService) {
    this.cdnUrl = api.cdnUrl;
  }
  @Output()

  onVariantChange = new EventEmitter<ItemVariant>();
  ngOnInit(): void {
  }

  saveVariant() {
    if (this.itemId > 0) {
      if (this.variant.id > 0) {
        this.api.updateItemVariant(this.variant.id, this.itemId, this.variant).subscribe(data => {
          if (data.success) {
            this.onVariantChange.emit(this.variant);
          }
        });
      }
      else {
        this.variant.itemId = this.itemId;
        this.api.saveItemVariant(this.itemId, this.variant).subscribe(data => {
          if (data.success) {
            this.onVariantChange.emit(this.variant);
          }
        });
      }
    }
  }

  fileChange(event) {
    if (this.variant.id == null) {
      return;
    }
    let fileList: FileList = event.target.files;
    console.log(fileList);
    this.api.uploadItemVariantThumbnail(this.variant.id, fileList).subscribe(data => {
      this.onVariantChange.emit(this.variant);
    });
  }

}
