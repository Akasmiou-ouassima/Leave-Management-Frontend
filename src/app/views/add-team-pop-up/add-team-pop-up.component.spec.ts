import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamPopUpComponent } from './add-team-pop-up.component';

describe('AddTeamPopUpComponent', () => {
  let component: AddTeamPopUpComponent;
  let fixture: ComponentFixture<AddTeamPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeamPopUpComponent]
    });
    fixture = TestBed.createComponent(AddTeamPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
