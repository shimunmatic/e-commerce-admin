import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVariantDetailsComponent } from './item-variant-details.component';

describe('ItemVariantDetailsComponent', () => {
  let component: ItemVariantDetailsComponent;
  let fixture: ComponentFixture<ItemVariantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVariantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVariantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
