import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesUserComponent } from './leaves-user.component';

describe('LeavesUserComponent', () => {
  let component: LeavesUserComponent;
  let fixture: ComponentFixture<LeavesUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesUserComponent]
    });
    fixture = TestBed.createComponent(LeavesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
