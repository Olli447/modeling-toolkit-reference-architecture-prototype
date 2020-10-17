import {Component, Input, OnInit} from '@angular/core';
import {CollabortiveModel} from '../../../core/classes/collabortiveModel';
import {LoadingScreenService} from '../../../service/loading-screen.service';
import {ModellingManagerService} from '../../../core/modelling-manager.service';
import {Router} from '@angular/router';
import {LoadingStatus, LoadingStatusEvent} from '../../../core/classes/loadingStatusEvent';

@Component({
  selector: 'app-collaborative-selection',
  templateUrl: './collaborative-selection.component.html',
  styleUrls: ['./collaborative-selection.component.scss']
})
export class CollaborativeSelectionComponent implements OnInit {
  @Input() collaboration: CollabortiveModel;

  constructor
  (
    public loadingScreenService: LoadingScreenService,
    public modellingManager: ModellingManagerService,
    public router: Router
  ) {  }

  ngOnInit() {
  }

  /**
   * This method is being called if you press the new button
   * */
  onClickLoad() {
    // init route change
    this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.PENDING, null, 'Loading modelling Language'));
    setTimeout(() => {this.router.navigate(['/modelling', this.collaboration.languageID], {
      queryParams: {
        collaboration: this.collaboration.modelID
      }
    }); }, 500);
  }
}


