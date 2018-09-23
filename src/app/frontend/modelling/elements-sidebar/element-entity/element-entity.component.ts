import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AbstractElement} from '../../../../core/classes/abstractElement';
import {AbstractEntity} from '../../../../core/classes/abstractEntity';
import {AbstractRelation} from '../../../../core/classes/abstractRelation';
import {ElementType} from '../../../../core/classes/elementTypeEnum';

@Component({
  selector: 'app-element-entity',
  templateUrl: './element-entity.component.html',
  styleUrls: ['./element-entity.component.scss']
})
/**
 * This component receives a single Entity from the ElementsSidebarComponent and displays it.
 * This component also starts the dragStart event to enable drag-and-drop integration with GoJS
 * */
export class ElementEntityComponent implements OnInit {
    @Input() element: AbstractElement;

  constructor() { }

  ngOnInit() {
  }

    @HostListener('dragstart', ['$event'])
    onDragStart($event: any) {
        if ($event.target.className !== 'draggable') {
            return;
        }
        const data = {
            type: ElementType.ENTITY,
            name: this.element.name
        };
        $event.dataTransfer.setData('text', JSON.stringify(data));
    }

}
