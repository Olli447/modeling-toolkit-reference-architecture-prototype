import { Component, OnInit } from '@angular/core';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {DataStorageService} from '../../../core/data-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
      private dataStorage: DataStorageService
  ) { }

  ngOnInit() {
  }

  saveModel() {
      this.dataStorage.saveModel();
  }

  exportModel() {
      this.dataStorage.exportModel();
  }
}
