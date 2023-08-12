import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPopUpComponent } from './add-user-pop-up.component';

describe('AddUserPopUpComponent', () => {
  let component: AddUserPopUpComponent;
  let fixture: ComponentFixture<AddUserPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserPopUpComponent]
    });
    fixture = TestBed.createComponent(AddUserPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
