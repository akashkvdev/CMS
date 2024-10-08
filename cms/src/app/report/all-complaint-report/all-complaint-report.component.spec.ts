import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComplaintReportComponent } from './all-complaint-report.component';

describe('AllComplaintReportComponent', () => {
  let component: AllComplaintReportComponent;
  let fixture: ComponentFixture<AllComplaintReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllComplaintReportComponent]
    });
    fixture = TestBed.createComponent(AllComplaintReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
