import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAttributeTypeComponent } from './modal-add-attribute-type.component';

describe('ModalAddAttributeTypeComponent', () => {
  let component: ModalAddAttributeTypeComponent;
  let fixture: ComponentFixture<ModalAddAttributeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddAttributeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddAttributeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
