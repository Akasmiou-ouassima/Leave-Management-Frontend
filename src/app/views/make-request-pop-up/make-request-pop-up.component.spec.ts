import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRequestPopUpComponent } from './make-request-pop-up.component';

describe('MakeRequestPopUpComponent', () => {
  let component: MakeRequestPopUpComponent;
  let fixture: ComponentFixture<MakeRequestPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeRequestPopUpComponent]
    });
    fixture = TestBed.createComponent(MakeRequestPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
