import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplainComponent } from './raise-complain.component';

describe('RaiseComplainComponent', () => {
  let component: RaiseComplainComponent;
  let fixture: ComponentFixture<RaiseComplainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaiseComplainComponent]
    });
    fixture = TestBed.createComponent(RaiseComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
