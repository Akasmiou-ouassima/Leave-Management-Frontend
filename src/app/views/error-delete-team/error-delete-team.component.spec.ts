import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDeleteTeamComponent } from './error-delete-team.component';

describe('ErrorDeleteTeamComponent', () => {
  let component: ErrorDeleteTeamComponent;
  let fixture: ComponentFixture<ErrorDeleteTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDeleteTeamComponent]
    });
    fixture = TestBed.createComponent(ErrorDeleteTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
