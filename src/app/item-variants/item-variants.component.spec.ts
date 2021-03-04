import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVariantsComponent } from './item-variants.component';

describe('ItemVariantsComponent', () => {
  let component: ItemVariantsComponent;
  let fixture: ComponentFixture<ItemVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVariantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
