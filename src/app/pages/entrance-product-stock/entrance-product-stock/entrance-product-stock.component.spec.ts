import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceProductStockComponent } from './entrance-product-stock.component';

describe('EntranceProductStockComponent', () => {
  let component: EntranceProductStockComponent;
  let fixture: ComponentFixture<EntranceProductStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntranceProductStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntranceProductStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
