import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestPopUpComponent } from './edit-request-pop-up.component';

describe('EditRequestPopUpComponent', () => {
  let component: EditRequestPopUpComponent;
  let fixture: ComponentFixture<EditRequestPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRequestPopUpComponent]
    });
    fixture = TestBed.createComponent(EditRequestPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
