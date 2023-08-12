import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeamPopUpComponent } from './update-team-pop-up.component';

describe('UpdateTeamPopUpComponent', () => {
  let component: UpdateTeamPopUpComponent;
  let fixture: ComponentFixture<UpdateTeamPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTeamPopUpComponent]
    });
    fixture = TestBed.createComponent(UpdateTeamPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
