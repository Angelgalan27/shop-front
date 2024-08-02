import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEntranceProductStockComponent } from './filter-entrance-product-stock.component';

describe('FilterEntranceProductStockComponent', () => {
  let component: FilterEntranceProductStockComponent;
  let fixture: ComponentFixture<FilterEntranceProductStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterEntranceProductStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterEntranceProductStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
