import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlClassSettingsComponent } from './uml-class-settings.component';

describe('UmlClassSettingsComponent', () => {
  let component: UmlClassSettingsComponent;
  let fixture: ComponentFixture<UmlClassSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmlClassSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmlClassSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
