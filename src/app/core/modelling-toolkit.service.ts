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
import { saveAs } from 'file-saver';
import {Iterable, Iterator, Link, Part} from 'gojs';

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
      private modellingManager: ModellingManagerService,
      private contentCheckManager: ContentCheckManagerService
  ) { }

    /**
     * Exports the model as a JPEG image
     * */
    exportModel() {
        const image = this.modellingAreaComponent.diagram.makeImageData({
            scale: 1,
            background: 'White',
            type: 'image/jpeg',
        });
        const date = new Date();
        const fileName = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' - ' + this.currentLanguageID + '.jpeg';

        // In order to download the image you need to do a workaround, because saveAs dont work  with dataUrl's
        // create an link with the download attribute and the dataUrl as ref set
        const link = document.createElement('a');
        link.download = fileName;
        link.href = <string>image;
        // append that link to the site
        document.body.appendChild(link);
        // click the link
        link.click();
        // delete the link
        document.body.removeChild(link);

        // Don't ask me ... it works
    }

    /**
     * Uses GoJS to create an JSON representation of the model.
     * Creates a file with the json as content and offers it to download it
     * */
    saveModel() {
        const modelData = this.modellingAreaComponent.diagram.model.toJson();
        const date = new Date();
        const fileName = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' - ' + this.currentLanguageID + '.json';
        const blob = new Blob([modelData], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, fileName);
        this.isModelDataUnsaved = false;
    }

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
}
