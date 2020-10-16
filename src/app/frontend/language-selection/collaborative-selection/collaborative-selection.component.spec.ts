import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborativeSelectionComponent } from './collaborative-selection.component';

describe('CollaborativeSelectionComponent', () => {
  let component: CollaborativeSelectionComponent;
  let fixture: ComponentFixture<CollaborativeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborativeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborativeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
