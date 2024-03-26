import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionPlanComponent } from '@app/\pages\intervention-plans\intervention-plans.component';

describe('InterventionPlanComponent', () => {
  let component: InterventionPlanComponent;
  let fixture: ComponentFixture<InterventionPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionPlanComponent]
    });
    fixture = TestBed.createComponent(InterventionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
