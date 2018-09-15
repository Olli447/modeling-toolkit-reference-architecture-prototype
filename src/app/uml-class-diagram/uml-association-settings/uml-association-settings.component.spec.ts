import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlAssociationSettingsComponent } from './uml-association-settings.component';

describe('UmlAssociationSettingsComponent', () => {
  let component: UmlAssociationSettingsComponent;
  let fixture: ComponentFixture<UmlAssociationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmlAssociationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmlAssociationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
