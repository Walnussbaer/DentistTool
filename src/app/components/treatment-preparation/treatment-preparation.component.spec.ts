import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPreparationComponent } from './treatment-preparation.component';

describe('TreatmentPreparationComponent', () => {
  let component: TreatmentPreparationComponent;
  let fixture: ComponentFixture<TreatmentPreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentPreparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
