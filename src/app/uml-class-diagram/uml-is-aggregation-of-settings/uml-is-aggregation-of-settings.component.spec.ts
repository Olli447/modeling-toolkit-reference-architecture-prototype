import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlIsAggregationOfSettingsComponent } from './uml-is-aggregation-of-settings.component';

describe('UmlIsAggregationOfSettingsComponent', () => {
  let component: UmlIsAggregationOfSettingsComponent;
  let fixture: ComponentFixture<UmlIsAggregationOfSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmlIsAggregationOfSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmlIsAggregationOfSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
