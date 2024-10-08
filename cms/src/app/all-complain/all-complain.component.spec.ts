import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComplainComponent } from './all-complain.component';

describe('AllComplainComponent', () => {
  let component: AllComplainComponent;
  let fixture: ComponentFixture<AllComplainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllComplainComponent]
    });
    fixture = TestBed.createComponent(AllComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
