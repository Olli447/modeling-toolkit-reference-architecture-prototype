import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {element} from 'protractor';
import {Relation} from '../../../core/classes/relation';
import {Entity} from '../../../core/classes/entity';
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
export class ElementsSidebarComponent implements OnInit, OnDestroy {
  languageSubscription: Subscription;
  entities: Entity[];
  relations: Relation[];

  selectedRelation: Relation;

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

  relationClicked(relation: Relation) {
        this.selectedRelation = relation;
  }
  relationPopUpDismissed() {
        this.selectedRelation = null;
  }
}

