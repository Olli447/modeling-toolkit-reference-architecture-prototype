import { Injectable } from '@angular/core';
import {CheckHandlerArray, CheckReturn} from '../classes/abstractCheckHandler';
import {ModellingToolkitService} from './modelling-toolkit.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Language} from '../classes/language';
import {Relation} from '../classes/relation';
import {RelationSelectionData} from '../frontend/modelling/elements-sidebar/element-relation-selection/element-relation-selection.component';
import {ModellingManagerService} from './modelling-manager.service';
import * as go from 'gojs';

@Injectable({
  providedIn: 'root'
})
export class ContentCheckManagerService {
  private _checkHandlerArray: CheckHandlerArray;
  private _diagram: go.Diagram;

  constructor() {}

  doLinkCheck(data: RelationSelectionData, relation: Relation): CheckReturn {
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
