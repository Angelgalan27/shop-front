import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTypeListComponent } from './attribute-type-list.component';

describe('AttributeTypeListComponent', () => {
  let component: AttributeTypeListComponent;
  let fixture: ComponentFixture<AttributeTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
