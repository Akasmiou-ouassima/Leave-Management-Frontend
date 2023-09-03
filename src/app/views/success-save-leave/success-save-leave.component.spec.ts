import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSaveLeaveComponent } from './success-save-leave.component';

describe('SuccessSaveLeaveComponent', () => {
  let component: SuccessSaveLeaveComponent;
  let fixture: ComponentFixture<SuccessSaveLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessSaveLeaveComponent]
    });
    fixture = TestBed.createComponent(SuccessSaveLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
