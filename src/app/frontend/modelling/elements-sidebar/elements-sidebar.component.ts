import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {element} from 'protractor';
import {AbstractRelation} from '../../../core/classes/abstractRelation';
import {AbstractEntity} from '../../../core/classes/abstractEntity';
import {Variable} from '../../../core/classes/variable';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Language} from '../../../core/classes/language';
import * as go from 'gojs';

@Component({
  selector: 'app-elements-sidebar',
  templateUrl: './elements-sidebar.component.html',
  styleUrls: ['./elements-sidebar.component.scss']
})
/**
 * Provides the Elements and Relations to the according components.
 * The entities and relations are being updated through the language subscription
 * */
export class ElementsSidebarComponent implements OnInit, OnDestroy {
  languageSubscription: Subscription;
  entities: AbstractEntity[];
  relations: AbstractRelation[];

  /**
   * If this attribute is set the overlay to create a relation will be shown.
   * The selected relation will be passed to the overlay.
   * If the overlay is dismissed this attribute is set to null. This removes the overlay.
   * */
  selectedRelation: AbstractRelation;

  constructor(
      private modellingToolkit: ModellingToolkitService
  ) {

    }

  ngOnInit() {
      this.languageSubscription = this.modellingToolkit.currentLanguage$.subscribe((language: Language) => {
          this.entities = language.entities;
          this.relations = language.relations;
      });
  }

  ngOnDestroy(): void {
  }

  relationClicked(relation: AbstractRelation) {
        this.selectedRelation = relation;
  }
  relationPopUpDismissed() {
        this.selectedRelation = null;
  }
}

