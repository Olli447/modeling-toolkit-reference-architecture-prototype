import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {LoadingScreenService} from '../../service/loading-screen.service';
import {LoadingStatus} from '../../classes/loadingStatusEvent';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loadingScreenSubscription: Subscription;
  loadingStatus: LoadingStatus;
  progress: number;
  message: string;

  public loadingStatusEnum = LoadingStatus;

  constructor(private loadingScreenService: LoadingScreenService) {
      this.loadingStatus = LoadingStatus.UNINITIALISED;
      this.loadingScreenSubscription = loadingScreenService.loadingStatus$.subscribe(
          loadingStatusEvent => {
            this.loadingStatus = loadingStatusEvent.status;
            this.progress = loadingStatusEvent.progress;
            this.message = loadingStatusEvent.message;
          }
      );
  }

  ngOnInit() {
  }


  ngOnDestroy() {
      // prevent memory leak when component destroyed
      this.loadingScreenSubscription.unsubscribe();
  }

}
