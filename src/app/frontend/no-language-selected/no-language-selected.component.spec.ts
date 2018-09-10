import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLanguageSelectedComponent } from './no-language-selected.component';

describe('NoLanguageSelectedComponent', () => {
  let component: NoLanguageSelectedComponent;
  let fixture: ComponentFixture<NoLanguageSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLanguageSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLanguageSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
