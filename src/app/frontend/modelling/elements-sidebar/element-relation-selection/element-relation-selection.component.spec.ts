import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRelationSelectionComponent } from './element-relation-selection.component';

describe('ElementRelationSelectionComponent', () => {
  let component: ElementRelationSelectionComponent;
  let fixture: ComponentFixture<ElementRelationSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementRelationSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementRelationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
