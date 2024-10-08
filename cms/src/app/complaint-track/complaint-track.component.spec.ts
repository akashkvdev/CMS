import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintTrackComponent } from './complaint-track.component';

describe('ComplaintTrackComponent', () => {
  let component: ComplaintTrackComponent;
  let fixture: ComponentFixture<ComplaintTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintTrackComponent]
    });
    fixture = TestBed.createComponent(ComplaintTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
