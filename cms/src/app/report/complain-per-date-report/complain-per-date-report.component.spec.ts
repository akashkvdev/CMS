import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainPerDateReportComponent } from './complain-per-date-report.component';

describe('ComplainPerDateReportComponent', () => {
  let component: ComplainPerDateReportComponent;
  let fixture: ComponentFixture<ComplainPerDateReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplainPerDateReportComponent]
    });
    fixture = TestBed.createComponent(ComplainPerDateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
