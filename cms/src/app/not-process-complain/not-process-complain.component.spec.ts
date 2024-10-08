import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotProcessComplainComponent } from './not-process-complain.component';

describe('NotProcessComplainComponent', () => {
  let component: NotProcessComplainComponent;
  let fixture: ComponentFixture<NotProcessComplainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotProcessComplainComponent]
    });
    fixture = TestBed.createComponent(NotProcessComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
