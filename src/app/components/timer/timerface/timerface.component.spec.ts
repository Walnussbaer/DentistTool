import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerfaceComponent } from './timerface.component';

describe('TimerfaceComponent', () => {
  let component: TimerfaceComponent;
  let fixture: ComponentFixture<TimerfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
