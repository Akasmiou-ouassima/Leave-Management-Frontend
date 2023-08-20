import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteTeamComponent } from './confirm-delete-team.component';

describe('ConfirmDeleteTeamComponent', () => {
  let component: ConfirmDeleteTeamComponent;
  let fixture: ComponentFixture<ConfirmDeleteTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteTeamComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
