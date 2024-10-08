import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingComplainReportComponent } from './pending-complain-report.component';

describe('PendingComplainReportComponent', () => {
  let component: PendingComplainReportComponent;
  let fixture: ComponentFixture<PendingComplainReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingComplainReportComponent]
    });
    fixture = TestBed.createComponent(PendingComplainReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
