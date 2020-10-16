import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CollabortiveModel} from './classes/collabortiveModel';
import {ModellingManagerService} from './modelling-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  websocket: WebSocketSubject<any>;
  private websocketConnection: Subscription;
  uuid: string;
  modelsAvailable: CollabortiveModel[];

  constructor(private modellingManager: ModellingManagerService) {
    this.init();
  }

  init() {
    this.websocket = webSocket('ws://localhost:8081');

    this.websocketConnection = this.websocket.subscribe(
      msg => {
        this.onEvent(msg);
      }, error => {
        console.log(error);
      }, () => {
        this.init();
      }
    );
  }

  onEvent(value) {
    console.log(value);
    switch (value.channel) {
      case 'onConnect':
        this.onConnect(value);
        break;
      case 'heartbeat':
        this.onHeartbeat(value);
        break;
      case 'models':
        this.onModelSelectionChange(value);
        break;
      case 'addModel':
        this.onAddModel(value);
        break;
      case 'joinModel':
        this.onJoinModel(value);
        break;
      case 'sendModelChange':
        this.onSendModelChange(value);
        break;
      case 'sendChatMessage':
        this.onSendChatMessage(value);
        break;
      case 'modelling':
        this.onModelChange(value);
        break;
      case 'messages':
        this.onMessage(value);
        break;
    }
  }

  onConnect(value) {
    this.uuid = value.data;
    console.log('websocket id: ' + this.uuid);
  }

  onModelSelectionChange(value) {
    this.modelsAvailable = value.data;
    for (let i = 0; i < this.modelsAvailable.length; i++) {
      const model = this.modelsAvailable[i];
      const language = this.modellingManager.getLanguageByID(model.languageID);

      if (language === undefined) {
        this.modelsAvailable.slice(i, 1);
      } else {
        model.language = language;
      }
    }
  }

  addModel(modelID: string, languageID: string) {
    if (this.uuid) {
      this.websocket.next({
        uuid: this.uuid,
        channel: 'addModel',
        modelID: modelID,
        languageID: languageID,
        data: null
      });
    } else {
      const self = this;
      setTimeout(() => {
        this.websocket.next({
          uuid: this.uuid,
          channel: 'addModel',
          modelID: modelID,
          languageID: languageID,
          data: null
        });
      }, 100);
    }
  }
  onAddModel(value) {
    if (value.success === false) {
      console.log(value.error);
      if (value.error === 'No such user') {
        const self = this;
        setTimeout(() => {
          this.websocket.next({
            uuid: this.uuid,
            channel: 'addModel',
            modelID: value.data.modelID,
            languageID: value.data.languageID,
            data: null
          });
        }, 150);
      }
    }
  }

  joinModelling(modelID: string, languageID: string) {
    if (this.uuid) {
      this.websocket.next({
        uuid: this.uuid,
        channel: 'joinModel',
        modelID: modelID,
        languageID: languageID,
      });
    } else {
      const self = this;
      setTimeout(() => {
        self.websocket.next({
          uuid: this.uuid,
          channel: 'joinModel',
          modelID: modelID,
          languageID: languageID,
        });
      }, 100);
    }

  }
  onJoinModel(value) {
    if (value.success === false) {
      if (value.error === 'No such room') {
        this.addModel(value.data.modelID, value.data.languageID);
      } else if (value.error === 'No such user') {
        const self = this;
        setTimeout(() => {
          this.websocket.next({
            uuid: this.uuid,
            channel: 'addModel',
            modelID: value.data.modelID,
            languageID: value.data.languageID,
            data: null
          });
        }, 150);
      }
    }
  }
  onSendModelChange(value) {

  }
  onSendChatMessage(value) {

  }
  onModelChange(value) {

  }
  onMessage(message) {
    console.log(message);
  }

  private onHeartbeat(value) {
    this.websocket.next({
      channel: 'heartbeat'
    });
  }
}
