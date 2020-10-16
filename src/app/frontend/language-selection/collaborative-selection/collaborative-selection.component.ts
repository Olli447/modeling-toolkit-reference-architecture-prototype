import {Component, Input, OnInit} from '@angular/core';
import {CollabortiveModel} from '../../../core/classes/collabortiveModel';

@Component({
  selector: 'app-collaborative-selection',
  templateUrl: './collaborative-selection.component.html',
  styleUrls: ['./collaborative-selection.component.scss']
})
export class CollaborativeSelectionComponent implements OnInit {
  @Input() collaboration: CollabortiveModel;

  constructor() { }

  ngOnInit(): void {
  }

}
