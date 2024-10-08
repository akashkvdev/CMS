import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedComplainReportComponent } from './solved-complain-report.component';

describe('SolvedComplainReportComponent', () => {
  let component: SolvedComplainReportComponent;
  let fixture: ComponentFixture<SolvedComplainReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolvedComplainReportComponent]
    });
    fixture = TestBed.createComponent(SolvedComplainReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
