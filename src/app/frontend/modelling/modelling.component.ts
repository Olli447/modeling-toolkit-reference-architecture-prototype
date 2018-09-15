import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as go from 'gojs';
import {settings} from 'cluster';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-modelling',
  templateUrl: './modelling.component.html',
  styleUrls: ['./modelling.component.scss']
})
export class ModellingComponent implements OnInit {

  @ViewChild('settings')
  public settingsSidebar: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  hasUnsavedData(): Boolean {
    return false;
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      if (this.hasUnsavedData()) {
          $event.returnValue = true;
      }
  }

}
