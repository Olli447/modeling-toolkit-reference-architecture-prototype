import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-modelling',
  templateUrl: './modelling.component.html',
  styleUrls: ['./modelling.component.scss'],
})
export class ModellingComponent implements OnInit {

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
