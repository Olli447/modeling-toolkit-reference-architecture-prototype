import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlIsCompositionOfSettingsComponent } from './uml-is-composition-of-settings.component';

describe('UmlIsCompositionOfSettingsComponent', () => {
  let component: UmlIsCompositionOfSettingsComponent;
  let fixture: ComponentFixture<UmlIsCompositionOfSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmlIsCompositionOfSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmlIsCompositionOfSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
