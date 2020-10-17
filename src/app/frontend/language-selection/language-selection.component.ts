import { Component, OnInit } from '@angular/core';
import {Language} from '../../core/classes/language';
import {ModellingManagerService} from '../../core/modelling-manager.service';
import {SocketService} from '../../core/socket.service';
import {CollabortiveModel} from '../../core/classes/collabortiveModel';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
    languages: Language[];
    collaborativeModels: CollabortiveModel[];

  constructor(public modellingManager: ModellingManagerService,
              private socket: SocketService) {
      this.languages = modellingManager.languages;
      this.socket.modelsAvailable$.subscribe(value => {
        this.collaborativeModels = value;
      });

  }

    ngOnInit() {
    }
}
