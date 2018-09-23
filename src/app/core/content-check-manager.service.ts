import { Injectable } from '@angular/core';
import {CheckHandlerArray, CheckReturn} from './classes/abstractCheckHandler';
import {ModellingToolkitService} from './modelling-toolkit.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Language} from './classes/language';
import {AbstractRelation} from './classes/abstractRelation';
import {RelationSelectionData} from '../frontend/modelling/elements-sidebar/element-relation-selection/element-relation-selection.component';
import {ModellingManagerService} from './modelling-manager.service';
import * as go from 'gojs';

@Injectable({
  providedIn: 'root'
})
/**
 * The ContentCheckManagerService coordinates the content checks. The Service receives the checkHandlerArray from the {@link ModellingToolkitService}, when a new language is being loaded.
 *
 * With the Method {@link doLinkCheck} an class that holds the ContentCheckManagerService can initiate a check.
 * This method is used by the {@link ElementRelationSelectionComponent} before every link creation.
 * */
export class ContentCheckManagerService {
  private _checkHandlerArray: CheckHandlerArray;
  private _diagram: go.Diagram;

  constructor() {}

  /**
   * This method loads all check handlers for an relation and calls these handlers in order.
   * If no entry in the dictionary, for the given id, is found no checks will be done.
   *
   * The first {@link CheckReturn} value that that failed will be presented to the user.
   *
   * @param data - This is the data from the model, that is part of the link object in the go.Diagram. Remember that you mustn't change this data without copying it first (and a transaction to commit the changes)
   * @param relation - The AbstractRelation which is used to load the valid possibilities
   * @return The {@link CheckReturn} object, which holds the information if the check has failed and why
   *  */
  doLinkCheck(data: RelationSelectionData, relation: AbstractRelation): CheckReturn {
      const linkData = {
          from: data.fromEntity,
          to: data.toEntity,
          category: data.relation.id
      };

    if (relation.id !== linkData.category) {
      throw new class implements Error {
          message = 'There was an mismatch between two ids that should be the same';
          name = 'IDMismatchError';
      };
    }
    const assignedCheckHandlers = this._checkHandlerArray[linkData.category];

    if (!assignedCheckHandlers) {
      return {
          errorMsg: null,
          isFailed: false
      };
    }

      for (let i = 0; i < assignedCheckHandlers.length; i++) {
        const returnValue = assignedCheckHandlers[i].check(this._diagram, relation, linkData);
        if (returnValue.isFailed) {
          return returnValue;
        }
      }

      return {
        isFailed: false,
        errorMsg: null
      };
  }

  set checkHandlerArray(checkHanderArray: CheckHandlerArray) {
    this._checkHandlerArray = checkHanderArray;
  }
  set diagram(diagram: go.Diagram) {
    this._diagram = diagram;
  }
}
