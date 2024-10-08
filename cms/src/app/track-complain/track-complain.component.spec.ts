import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackComplainComponent } from './track-complain.component';

describe('TrackComplainComponent', () => {
  let component: TrackComplainComponent;
  let fixture: ComponentFixture<TrackComplainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackComplainComponent]
    });
    fixture = TestBed.createComponent(TrackComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
