import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentWiseReportComponent } from './department-wise-report.component';

describe('DepartmentWiseReportComponent', () => {
  let component: DepartmentWiseReportComponent;
  let fixture: ComponentFixture<DepartmentWiseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentWiseReportComponent]
    });
    fixture = TestBed.createComponent(DepartmentWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
