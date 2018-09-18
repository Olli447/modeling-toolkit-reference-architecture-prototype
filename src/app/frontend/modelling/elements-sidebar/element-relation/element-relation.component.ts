import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Output} from '@angular/core';
import {AbstractElement} from '../../../../core/classes/abstractElement';
import {ElementType} from '../../../../core/classes/elementTypeEnum';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {ModellingToolkitService} from '../../../../core/modelling-toolkit.service';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogData} from '../../../language-selection/language/language.component';
import {Relation} from '../../../../core/classes/relation';

@Component({
  selector: 'app-element-relation',
  templateUrl: './element-relation.component.html',
  styleUrls: ['./element-relation.component.scss']
})
export class ElementRelationComponent implements OnInit {
    @Input() element: Relation;
    @Output() elementSelected = new EventEmitter<Relation>();


    constructor() { }

    ngOnInit() {
    }

    onClick() {
        this.elementSelected.emit(this.element);
    }

}
