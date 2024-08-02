import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAttributeComponent } from './modal-add-attribute.component';

describe('ModalAddAttributeComponent', () => {
  let component: ModalAddAttributeComponent;
  let fixture: ComponentFixture<ModalAddAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddAttributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
