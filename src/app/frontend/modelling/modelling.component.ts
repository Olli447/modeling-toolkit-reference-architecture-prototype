import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as go from 'gojs';
import {settings} from 'cluster';
import { MatSidenav } from '@angular/material/sidenav';
import {ModellingToolkitService} from '../../core/modelling-toolkit.service';

@Component({
  selector: 'app-modelling',
  templateUrl: './modelling.component.html',
  styleUrls: ['./modelling.component.scss']
})
export class ModellingComponent implements OnInit {

  @ViewChild('settings', { static: true })
  public settingsSidebar: MatSidenav;

  constructor(private modellingToolkit: ModellingToolkitService) { }

  ngOnInit() {
  }

  hasUnsavedData(): Boolean {
    return this.modellingToolkit.isModelDataUnsaved;
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      if (this.hasUnsavedData()) {
          $event.returnValue = true;
      }
  }

}
