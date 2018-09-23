import { Component, OnInit } from '@angular/core';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
      private modellingToolkit: ModellingToolkitService
  ) { }

  ngOnInit() {
  }

  saveModel() {
      this.modellingToolkit.saveModel();
  }

  exportModel() {
      this.modellingToolkit.exportModel();
  }
}
