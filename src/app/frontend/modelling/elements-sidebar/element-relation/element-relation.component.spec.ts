import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRelationComponent } from './element-relation.component';

describe('ElementRelationComponent', () => {
  let component: ElementRelationComponent;
  let fixture: ComponentFixture<ElementRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
