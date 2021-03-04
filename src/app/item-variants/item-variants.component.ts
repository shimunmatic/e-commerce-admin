import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemVariant } from '../model/item.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-item-variants',
  templateUrl: './item-variants.component.html',
  styleUrls: ['./item-variants.component.css']
})
export class ItemVariantsComponent implements OnInit {
  @Input()
  variants: ItemVariant[] = [];
  
  cdnUrl = "";

  constructor() {

  }
  @Output()
  onVariantClicked = new EventEmitter<ItemVariant>();

  ngOnInit() { }

  variantClicked(variant: ItemVariant) {
    this.onVariantClicked.emit(variant);
  }

  newVariant(){
    this.onVariantClicked.emit(new ItemVariant());
  }

}
