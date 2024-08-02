import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBottomMobileComponent } from './menu-bottom-mobile.component';

describe('MenuBottomMobileComponent', () => {
  let component: MenuBottomMobileComponent;
  let fixture: ComponentFixture<MenuBottomMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBottomMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBottomMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
