import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoadingStatus, LoadingStatusEvent} from '../../core/classes/loadingStatusEvent';
import {LoadingScreenService} from '../../service/loading-screen.service';

@Component({
  selector: 'app-no-language-selected',
  templateUrl: './no-language-selected.component.html',
  styleUrls: ['./no-language-selected.component.scss']
})
export class NoLanguageSelectedComponent implements OnInit, AfterViewInit {

  constructor(
      private loadingScreenService: LoadingScreenService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      setTimeout(() => {
          this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.DONE, null, null));
      }, 200);
  }

}
