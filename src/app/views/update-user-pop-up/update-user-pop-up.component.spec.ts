import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserPopUpComponent } from './update-user-pop-up.component';

describe('UpdateUserPopUpComponent', () => {
  let component: UpdateUserPopUpComponent;
  let fixture: ComponentFixture<UpdateUserPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserPopUpComponent]
    });
    fixture = TestBed.createComponent(UpdateUserPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
