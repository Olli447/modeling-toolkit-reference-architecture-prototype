import { Component, OnInit } from '@angular/core';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import { saveAs } from 'file-saver/FileSaver';

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
      const modelData = this.modellingToolkit.modellingAreaComponent.diagram.model.toJson();
      const date = new Date();
      const fileName = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' - ' + this.modellingToolkit.currentLanguageID + '.json';
      const blob = new Blob([modelData], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, fileName);
  }
}
