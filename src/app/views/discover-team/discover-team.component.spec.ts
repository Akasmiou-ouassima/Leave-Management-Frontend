import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverTeamComponent } from './discover-team.component';

describe('DiscoverTeamComponent', () => {
  let component: DiscoverTeamComponent;
  let fixture: ComponentFixture<DiscoverTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverTeamComponent]
    });
    fixture = TestBed.createComponent(DiscoverTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
