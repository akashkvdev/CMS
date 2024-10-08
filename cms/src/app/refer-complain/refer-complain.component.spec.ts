import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferComplainComponent } from './refer-complain.component';

describe('ReferComplainComponent', () => {
  let component: ReferComplainComponent;
  let fixture: ComponentFixture<ReferComplainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferComplainComponent]
    });
    fixture = TestBed.createComponent(ReferComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
