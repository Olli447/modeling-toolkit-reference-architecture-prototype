import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementEntityComponent } from './element-entity.component';

describe('ElementEntityComponent', () => {
  let component: ElementEntityComponent;
  let fixture: ComponentFixture<ElementEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
