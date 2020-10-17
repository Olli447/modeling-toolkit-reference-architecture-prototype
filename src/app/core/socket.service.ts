import {Inject, Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CollabortiveModel} from './classes/collabortiveModel';
import {ModellingManagerService} from './modelling-manager.service';
import {DataStorageService} from './data-storage.service';
import {ModellingToolkitService} from './modelling-toolkit.service';
import {DOCUMENT} from '@angular/common';
import {Message} from './classes/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private websocket: WebSocketSubject<any>;
  private websocketConnection: Subscription;
  uuid: string;
  lastModelID: string;
  lastLanguageID: string;
  private modelsAvailableSource: Subject<CollabortiveModel[]>;
  modelsAvailable$: Observable<CollabortiveModel[]>;

  private modelContentSource: Subject<any>;
  modelContent$: Observable<any>;

  private chatMessageSource: Subject<Message>;
  chatMessage$: Observable<Message>;

  constructor(
    private modellingManager: ModellingManagerService,
    private modellingToolkit: ModellingToolkitService,
    private dataStorage: DataStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.modelsAvailableSource = new Subject<CollabortiveModel[]>();
    this.modelsAvailable$ = this.modelsAvailableSource.asObservable();

    this.modelContentSource = new Subject<any>();
    this.modelContent$ = this.modelContentSource.asObservable();

    this.chatMessageSource = new Subject<Message>();
    this.chatMessage$ = this.chatMessageSource.asObservable();


    this.init();
    modellingToolkit.readyToJoinModel$.subscribe(value => {
      this.joinModelling(value.modelID, value.languageID);
      this.lastModelID = value.modelID;
      this.lastLanguageID = value.languageID;
    });
    modellingToolkit.readyToCreateModel$.subscribe(value => {
      this.addModel(value.modelID, value.languageID);
      this.lastModelID = value.modelID;
      this.lastLanguageID = value.languageID;
    });
    modellingToolkit.modelChanged$.subscribe(value => {
      this.sendModelChange(value.modelID, value.languageID);
      this.lastModelID = value.modelID;
      this.lastLanguageID = value.languageID;
    });
  }

  init() {
    this.websocket = webSocket({
      url: 'ws://' + this.document.location.hostname + ':8081'
    });

    this.websocketConnection = this.websocket.subscribe(
      msg => {
        this.onEvent(msg);
      }, error => {
        console.log(error);
        this.init();
      }, () => {
        this.init();
      }
    );
  }

  private onEvent(value) {
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

  private onConnect(value) {
    if (this.uuid) {
      this.joinModelling(this.lastModelID, this.lastLanguageID);
    }
    this.uuid = value.data;
    console.log('websocket id: ' + this.uuid);
  }

  private onModelSelectionChange(value) {
    const modelsAvailable = value.data;
    for (let i = 0; i < modelsAvailable.length; i++) {
      const model = modelsAvailable[i];
      const language = this.modellingManager.getLanguageByID(model.languageID);

      if (language === undefined) {
        modelsAvailable.slice(i, 1);
      } else {
        model.language = language;
      }
    }
    this.modelsAvailableSource.next(modelsAvailable);
  }

  addModel(modelID: string, languageID: string) {
    if (this.uuid) {
      this.websocket.next({
        uuid: this.uuid,
        channel: 'addModel',
        modelID: modelID,
        languageID: languageID,
        data: this.dataStorage.exportModelToJSON()
      });
    } else {
      const self = this;
      setTimeout(() => {
        this.websocket.next({
          uuid: this.uuid,
          channel: 'addModel',
          modelID: modelID,
          languageID: languageID,
          data: this.dataStorage.exportModelToJSON()
        });
      }, 100);
    }
  }
  private onAddModel(value) {
    if (value.success === false) {
      console.log(value.error);
      if (value.error === 'No such user') {
        const self = this;
        setTimeout(() => {
          self.addModel(value.data.modelID, value.data.languageID);
        }, 150);
      }
      if (value.error === 'Room already exists') {
        this.joinModelling(value.data.modelID, value.data.languageID);
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
  private onJoinModel(value) {
    if (value.success === true) {
      this.modelContentSource.next(value.data);
    } else if (value.success === false) {
      if (value.error === 'No such room') {
        this.addModel(value.data.modelID, value.data.languageID);
      } else if (value.error === 'No such user') {
        const self = this;
        setTimeout(() => {
          this.websocket.next({
            uuid: this.uuid,
            channel: 'joinModel',
            modelID: value.data.modelID,
            languageID: value.data.languageID,
            data: null
          });
        }, 150);
      }
    }
  }
  sendModelChange(modelID: string, languageID: string) {
    if (this.uuid) {
      this.websocket.next({
        uuid: this.uuid,
        channel: 'sendModelChange',
        modelID: modelID,
        languageID: languageID,
        data: this.dataStorage.exportModelToJSON()
      });
    } else {
      const self = this;
      setTimeout(() => {
        this.websocket.next({
          uuid: this.uuid,
          channel: 'sendModelChange',
          modelID: modelID,
          languageID: languageID,
          data: this.dataStorage.exportModelToJSON()
        });
      }, 100);
    }
  }
  private onSendModelChange(value) {

  }
  sendChatMessage(message) {
    if (this.uuid) {
      this.websocket.next({
        uuid: this.uuid,
        channel: 'sendChatMessage',
        modelID: this.lastModelID,
        data: message
      });
    } else {
      const self = this;
      setTimeout(() => {
        this.websocket.next({
          uuid: this.uuid,
          channel: 'sendChatMessage',
          modelID: this.lastModelID,
          data: message
        });
      }, 100);
    }
  }
  private onSendChatMessage(value) {

  }
  private onModelChange(value) {
    this.modelContentSource.next(value.data);
  }

  private onMessage(value) {
    this.chatMessageSource.next(value.data);
  }

  private onHeartbeat(value) {
    this.websocket.next({
      channel: 'heartbeat'
    });
  }
}
