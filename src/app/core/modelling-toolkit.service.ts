import {ComponentRef, ElementRef, Injectable, Type} from '@angular/core';
import {Language} from './classes/language';
import {ModellingManagerService} from './modelling-manager.service';
import {Subject} from 'rxjs/internal/Subject';
import * as go from 'gojs';
import {AbstractEntity, EntityInstance} from './classes/abstractEntity';
import {AbstractRelation, RelationInstance} from './classes/abstractRelation';
import {ModellingAreaComponent} from '../frontend/modelling/modelling-area/modelling-area.component';
import {SettingsSidebarComponent} from '../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {ContentCheckManagerService} from './content-check-manager.service';
import {ChangedEvent, Iterable, Iterator, Link, Part} from 'gojs';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 * The ModellingToolkitService is used as an event broadcaster and interface to the GoJS library.
 * The service provides references to important components and emits events is a something is selected, created or deleted.
 * You can subscribe to the Events by subscribing to the observable.
 * */
export class ModellingToolkitService {
  public modellingAreaComponent: ModellingAreaComponent;
  public settingSidebarComponent: SettingsSidebarComponent;
  public isModelDataUnsaved: boolean;

  public currentLanguageID: string;
  private  currentLanguageSource: Subject<Language> = new Subject<Language>();
  currentLanguage$ = this.currentLanguageSource.asObservable();

  public currentModelID: string;
  private  currentModelSource: Subject<string> = new Subject<string>();
  currentModel$ = this.currentLanguageSource.asObservable();

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

  private readyToCreateModelSource: Subject<any> = new Subject<any>();
  readyToCreateModel$ = this.readyToCreateModelSource.asObservable();
  private readyToJoinModelSource: Subject<any> = new Subject<any>();
  readyToJoinModel$ = this.readyToJoinModelSource.asObservable();

  private modelChangedSource: Subject<any> = new Subject<any>();
  modelChanged$ = this.modelChangedSource.asObservable();

  constructor(
      private modellingManager: ModellingManagerService,
      private contentCheckManager: ContentCheckManagerService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

    /**
     * Starts a transaction in GoJS
     * */
    startTransaction(action: string, changedElementIdentifier: string, from?: string, to?: string) {
      if (from && to) {
          this.modellingAreaComponent.diagram.startTransaction( changedElementIdentifier + '(from: ' + from + ' - to: ' + to + '): ' + action);
      } else {
          this.modellingAreaComponent.diagram.startTransaction(changedElementIdentifier + ': ' + action);
      }
    }
    /**
     * Commits a transaction in GoJS
     * */
    commitTransaction(action: string, changedElementIdentifier: string, from?: string, to?: string) {
        if (from && to) {
            this.modellingAreaComponent.diagram.commitTransaction( changedElementIdentifier + '(from: ' + from + ' - to: ' + to + '): ' + action);
        } else {
            this.modellingAreaComponent.diagram.commitTransaction(changedElementIdentifier + ': ' + action);
        }
     }

     onModelChanged(event: ChangedEvent) {
      if (event.isTransactionFinished && !event.model.skipsUndoManager && event.oldValue !== 'Initial Layout') {
        this.modelChangedSource.next({
          modelID: this.currentModelID,
          languageID: this.currentLanguageID
        });
      }
     }

     /**
      * Creates a node with GoJS
      * */
    createNode(entity: AbstractEntity, point: go.Point) {
      this.modellingAreaComponent.createNode(entity, point);
    }
    /**
     * Creates a link with GoJS
     * */
    createLink(data: any) {
      this.modellingAreaComponent.createLink(data);
    }

    /**
     * Sets a data property within the GoJS model
     * */
    setDataProperty(linkData: any, property: string, value: any) {
        this.modellingAreaComponent.diagram.model.setDataProperty(linkData, property, value);
    }

    /**
     * Finds node data for a given id
     * */
    findNodeDataForKey(nodeData: any) {
        return this.modellingAreaComponent.diagram.model.findNodeDataForKey(nodeData);
    }

    /**
     * Finds all links that match an example link data
     * @return The retrn is an Iterator containing the whole link!!! If you want to access the data you have to access the data attribute of each link
     * */
    findLinksByExample(linkData: any): Iterator<Link> {
        return this.modellingAreaComponent.diagram.findLinksByExample(linkData);
    }

    /**
     * Removes a node for given NodeData
     * */
    removeNodeData(nodeData: any) {
        this.modellingAreaComponent.diagram.model.removeNodeData(nodeData);
    }

    /**
     * Removes all parts (nodes + links) that are contained in the Array/Iterable.
     * Note that you must provide the whole part! Only the data is not sufficient.
     *
     * This command is used to remove links. It's a bit overkill because unless other implementations our links have unique id's.
     * If not there could be more that one part with the exact same linkData (see {@link findLinksByExample}). The usage seems to be best practice
     * */
    removeParts(collection:  Array<Part> | Iterable<Part>) {
        this.modellingAreaComponent.diagram.removeParts(collection, false);
    }

    /**
     * Clears the selection of every selected part
     * */
    clearSelection() {
      this.modellingAreaComponent.diagram.clearSelection();
    }

    /**
     * Returns an entity class for a given name
     * Uses the entities array of {@link Language}
     * */
    getEntityByName(name: string): AbstractEntity {
      const language = this.modellingManager.getLanguageByID(this.currentLanguageID);
      for (let i = 0; i < language.entities.length; i++) {
            if (language.entities[i].name === name) {
                return language.entities[i];
            }
      }
    }

    /**
     * Returns a relation class for a given name
     * Uses the relations array of {@link Language}
     * */
    getRelationByName(name: string): AbstractRelation {
        const language = this.modellingManager.getLanguageByID(this.currentLanguageID);
        for (let i = 0; i < language.relations.length; i++) {
            if (language.relations[i].name === name) {
                return language.relations[i];
            }
        }
    }

    /**
     * This method updates all necessary attributes when the language changes / is set
     * Emits an event for the currentLanguage oberservable and updates the checkHandler array in the {@link ContentCheckManagerService}
     * */
    setLanguage(languageID: string) {
        this.currentLanguageID = languageID;
        const language = this.modellingManager.getLanguageByID(languageID);
        this.currentLanguageSource.next(language);
        this.contentCheckManager.checkHandlerArray = language.checkHandlers;
        this.contentCheckManager.diagram = this.modellingAreaComponent.diagram;
    }

    generateModelID(id: string) {
      this.modellingAreaComponent.diagram.addModelChangedListener(this.onModelChanged.bind(this));
      if (id) {
        this.currentModelID = id;
        this.readyToJoinModelSource.next({
          modelID: this.currentModelID,
          languageID: this.currentLanguageID
        });
      } else {
        this.currentModelID = this.uuidv4();
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { collaboration: this.currentModelID },
          queryParamsHandling: 'merge'
        });
        this.readyToCreateModelSource.next({
          modelID: this.currentModelID,
          languageID: this.currentLanguageID
        });
      }
      this.currentModelSource.next(this.currentModelID);
    }
  /**
     * This method emits an nodeSelected event
     * */
    nodeSelected(node: any) {
        this.nodeSelectedSource.next(node);
    }
  /**
     * This method emits an linkSelected event
     * */
    linkSelected(link: any) {
        this.linkSelectedSource.next(link);
    }

    /**
     * This method emits an partUnselected event
     * */
    partUnselected() {
        this.partUnselectedSource.next(null);
    }
  /**
     * This method emits an linkCreated event
     * */
    linkCreated(link: any) {
        this.linkCreatedSource.next(link);
    }

    /**
     * This method emits an linkDeleted event
     * */
    linkDeleted(link: any) {
        this.linkDeletedSource.next(link);
    }
  /**
     * This method emits an nodeCreated event
     * */
    nodeCreated(node: any) {
        this.nodeCreatedSource.next(node);
    }

    /**
     * This method emits an nodeDeleted event
     * */
    nodeDeleted(node: any) {
        this.nodeDeletedSource.next(node);
    }

    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }
}
