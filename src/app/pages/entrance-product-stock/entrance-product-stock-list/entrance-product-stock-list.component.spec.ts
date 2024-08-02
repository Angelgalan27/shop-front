import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceProductStockListComponent } from './entrance-product-stock-list.component';

describe('EntranceProductStockListComponent', () => {
  let component: EntranceProductStockListComponent;
  let fixture: ComponentFixture<EntranceProductStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntranceProductStockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntranceProductStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
