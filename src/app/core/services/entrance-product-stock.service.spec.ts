import { TestBed } from '@angular/core/testing';

import { EntranceProductStockService } from './entrance-product-stock.service';

describe('EntranceProductStockService', () => {
  let service: EntranceProductStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntranceProductStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
