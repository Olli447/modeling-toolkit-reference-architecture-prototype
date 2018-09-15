import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AbstractElement} from '../../../../classes/abstractElement';
import {Entity} from '../../../../classes/entity';
import {Relation} from '../../../../classes/relation';
import {ElementType} from '../../../../classes/elementTypeEnum';

@Component({
  selector: 'app-element-entity',
  templateUrl: './element-entity.component.html',
  styleUrls: ['./element-entity.component.scss']
})
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
