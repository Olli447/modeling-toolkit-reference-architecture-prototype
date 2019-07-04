import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Output} from '@angular/core';
import {AbstractElement} from '../../../../core/classes/abstractElement';
import {ElementType} from '../../../../core/classes/elementTypeEnum';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {ModellingToolkitService} from '../../../../core/modelling-toolkit.service';
import {map, startWith} from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {DialogData} from '../../../language-selection/language/language.component';
import {AbstractRelation} from '../../../../core/classes/abstractRelation';

@Component({
  selector: 'app-element-relation',
  templateUrl: './element-relation.component.html',
  styleUrls: ['./element-relation.component.scss']
})
/**
 * This component displays a single relation (received from ElementsSidebarComponent via Input) and displays it
 * Also emits a event, when the relation is being clicked so the ElementsSidebarComponent can trigger the overlay
 * */
export class ElementRelationComponent implements OnInit {
    @Input() element: AbstractRelation;
    @Output() elementSelected = new EventEmitter<AbstractRelation>();


    constructor() { }

    ngOnInit() {
    }

    onClick() {
        this.elementSelected.emit(this.element);
    }

}
