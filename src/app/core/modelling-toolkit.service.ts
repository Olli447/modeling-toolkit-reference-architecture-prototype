import {ComponentRef, ElementRef, Injectable, Type} from '@angular/core';
import {Language} from '../classes/language';
import {ModellingManagerService} from './modelling-manager.service';
import {Subject} from 'rxjs/internal/Subject';
import * as go from 'gojs';
import {Entity, EntityInstance} from '../classes/entity';
import {Relation, RelationInstance} from '../classes/relation';
import {tryCatch} from 'rxjs/internal-compatibility';
import {ModellingAreaComponent} from '../frontend/modelling/modelling-area/modelling-area.component';
import {SettingsSidebarComponent} from '../frontend/modelling/settings-sidebar/settings-sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ModellingToolkitService {
  private entities: EntityInstance[];
  private relations: RelationInstance[];
  private settingsComponents: { [key: string ]: Type<any> ; };
  public modellingAreaComponent: ModellingAreaComponent;
  public settingSidebarComponent: SettingsSidebarComponent;

  public currentLanguageID: string;
  private  currentLanguageSource: Subject<Language> = new Subject<Language>();
  currentLanguage$ = this.currentLanguageSource.asObservable();

  private  nodeSelectedSource: Subject<any> = new Subject<any>();
  nodeSelected$ = this.nodeSelectedSource.asObservable();
  private linkSelectedSource: Subject<any> = new Subject<any>();
  linkSelected$ = this.linkSelectedSource.asObservable();
  private partUnselectedSource: Subject<null> = new Subject<null>();
  partUnselected$ = this.partUnselectedSource.asObservable();

  private linkCreatedSource: Subject<any> = new Subject<any>();
  linkCreated$ = this.linkCreatedSource.asObservable();
  private linkDeletedSource: Subject<any> = new Subject<any>();
  linkDeleted$ = this.linkDeletedSource.asObservable();

  private nodeCreatedSource: Subject<any> = new Subject<any>();
  nodeCreated$ = this.nodeCreatedSource.asObservable();
  private nodeDeletedSource: Subject<any> = new Subject<any>();
  nodeDeleted$ = this.nodeDeletedSource.asObservable();

  constructor(
      private modellingManager: ModellingManagerService
  ) { }

    getEntityByName(name: string): Entity {
      const language = this.modellingManager.getLanguageByID(this.currentLanguageID);
      for (let i = 0; i < language.entities.length; i++) {
            if (language.entities[i].name === name) {
                return language.entities[i];
            }
      }
    }
    getRelationByName(name: string): Relation {
        const language = this.modellingManager.getLanguageByID(this.currentLanguageID);
        for (let i = 0; i < language.relations.length; i++) {
            if (language.relations[i].name === name) {
                return language.relations[i];
            }
        }
    }

    getEntityInstanceByID(id: string): EntityInstance {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].id === id) {
              return this.entities[i];
            }
        }
        return null;
    }
    getRelationInstanceByID(fromID: string, toID: string) {
        for (let i = 0; i < this.relations.length; i++) {
            if (this.relations[i].fromID === fromID && this.relations[i].toID === toID) {
              return this.relations[i];
            }
        }
        return null;
    }

    setLanguage(languageID: string) {
        this.currentLanguageID = languageID;
        this.currentLanguageSource.next(this.modellingManager.getLanguageByID(languageID));
    }

    nodeSelected(node: any) {
        this.nodeSelectedSource.next(node);
    }
    linkSelected(link: any) {
        this.linkSelectedSource.next(link);
    }
    partUnselected() {
        this.partUnselectedSource.next(null);
    }

    linkCreated(link: any) {
        this.linkCreatedSource.next(link);
    }
    linkDeleted(link: any) {
        this.linkDeletedSource.next(link);
    }

    nodeCreated(node: any) {
        this.nodeCreatedSource.next(node);
    }
    nodeDeleted(node: any) {
        this.nodeDeletedSource.next(node);
    }
}
