import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyResidentPageComponent } from './modify-resident-page.component';

describe('ModifyResidentPageComponent', () => {
  let component: ModifyResidentPageComponent;
  let fixture: ComponentFixture<ModifyResidentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyResidentPageComponent]
    });
    fixture = TestBed.createComponent(ModifyResidentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
