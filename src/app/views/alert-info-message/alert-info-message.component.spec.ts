import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInfoMessageComponent } from './alert-info-message.component';

describe('AlertInfoMessageComponent', () => {
  let component: AlertInfoMessageComponent;
  let fixture: ComponentFixture<AlertInfoMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertInfoMessageComponent]
    });
    fixture = TestBed.createComponent(AlertInfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
