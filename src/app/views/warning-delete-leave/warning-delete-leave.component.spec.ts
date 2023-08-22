import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDeleteLeaveComponent } from './warning-delete-leave.component';

describe('WarningDeleteLeaveComponent', () => {
  let component: WarningDeleteLeaveComponent;
  let fixture: ComponentFixture<WarningDeleteLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningDeleteLeaveComponent]
    });
    fixture = TestBed.createComponent(WarningDeleteLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
