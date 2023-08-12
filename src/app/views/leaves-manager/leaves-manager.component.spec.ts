import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesManagerComponent } from './leaves-manager.component';

describe('LeavesManagerComponent', () => {
  let component: LeavesManagerComponent;
  let fixture: ComponentFixture<LeavesManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesManagerComponent]
    });
    fixture = TestBed.createComponent(LeavesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
