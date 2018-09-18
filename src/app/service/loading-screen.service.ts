import { Injectable } from '@angular/core';
import {LoadingStatusEvent} from '../core/classes/loadingStatusEvent';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private loadingStatusSource = new Subject<LoadingStatusEvent>();
  loadingStatus$ = this.loadingStatusSource.asObservable();

  updateLoadingScreenStatus(loadingStatus: LoadingStatusEvent) {
    this.loadingStatusSource.next(loadingStatus);
  }

  constructor() { }
}
