import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSuccessComponent } from './team-success.component';

describe('TeamSuccessComponent', () => {
  let component: TeamSuccessComponent;
  let fixture: ComponentFixture<TeamSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamSuccessComponent]
    });
    fixture = TestBed.createComponent(TeamSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
