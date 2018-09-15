import {Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, AfterViewInit, HostListener} from '@angular/core';
import * as go from 'gojs';
import {LoadingStatus, LoadingStatusEvent} from '../../../classes/loadingStatusEvent';
import {LoadingScreenService} from '../../../service/loading-screen.service';
import {ModellingManagerService} from '../../../core/modelling-manager.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {forEach} from '@angular/router/src/utils/collection';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {Entity} from '../../../classes/entity';
import {ElementType} from '../../../classes/elementTypeEnum';
import {RelationSelectionData} from '../elements-sidebar/element-relation-selection/element-relation-selection.component';
@Component({
  selector: 'app-modelling-area',
  templateUrl: './modelling-area.component.html',
  styleUrls: ['./modelling-area.component.scss']
})
export class ModellingAreaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;
  public diagram: go.Diagram = new go.Diagram();

  private routeSubscription: any;
  private languageID: string;

  private pixelratio: number;

    constructor
    (
        public loadingScreenService: LoadingScreenService,
        public modellingManager: ModellingManagerService,
        public modellingToolkit: ModellingToolkitService,
        public route: ActivatedRoute
    ) {
        const $ = go.GraphObject.make;
        this.diagram = new go.Diagram();
        this.pixelratio = window.devicePixelRatio;
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.allowDrop = true;  // necessary for dragging from Palette
        this.diagram.undoManager.isEnabled = true;
        this.diagram.addDiagramListener('ObjectDoubleClicked',
            e => {
                const part = e.subject.part;
                if (part instanceof go.Node) {
                    this.modellingToolkit.nodeSelected(part.data);
                } else if (part instanceof go.Link) {
                    // TODO: Check if this works
                    this.modellingToolkit.linkSelected(part.data);
                }
            });
        this.diagram.addDiagramListener('ChangedSelection',
            e => {
                const part = e.diagram.selection.first();
                if (!part) {
                    this.modellingToolkit.partUnselected();
                }
            });
        // TODO: Change this to an custom event emitter
        this.diagram.addDiagramListener('LinkDrawn',
            e => {
                const link = e.subject.part;
                this.modellingToolkit.linkCreated(link instanceof go.Link ? link : null);
            });
        this.diagram.addDiagramListener('PartCreated',
            e => {
                const part = e.subject.part;
                if (part instanceof go.Node) {
                    this.modellingToolkit.nodeCreated(part);
                }
            });
    }

    ngOnInit() {
        this.modellingToolkit.modellingAreaComponent = this;
        this.diagram.div = this.diagramRef.nativeElement;
        this.routeSubscription = this.route.params.subscribe(params => {
            this.languageID = params['id'];
            this.modellingToolkit.setLanguage(this.languageID);

            this.initModel
            (
                this.createNodeMap(),
                this.createLinkMap(),
                this.getModelContent()
            );
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.DONE, null, null));
            }, 300);
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    getModelContent(): go.GraphLinksModel {
        let model = new go.GraphLinksModel();
        const rawData = this.modellingManager.rawModelData;
        if (!rawData || rawData === '') {
            return model;
        } 
        const jsonData = JSON.parse(rawData);
        model = <go.GraphLinksModel>go.GraphLinksModel.fromJson(jsonData);

        return model;
    }

    createNodeMap(): go.Map<string, go.Node> {
        const map = new go.Map<string, go.Node>();
        const entities = this.modellingManager.getLanguageByID(this.languageID).entities;

        for (let i = 0; i < entities.length; i++) {
            map.add(entities[i].id, <go.Node>entities[i].template);
        }

        return map;
    }

    createLinkMap(): go.Map<string, go.Link> {
        const map = new go.Map<string, go.Link>();
        const entities = this.modellingManager.getLanguageByID(this.languageID).relations;

        for (let i = 0; i < entities.length; i++) {
            map.add(entities[i].id, <go.Link>entities[i].template);
        }

        return map;
    }

    initModel(nodeMap: go.Map<string, go.Node>, linkMap: go.Map<string, go.Link>, content: go.GraphLinksModel) {
        this.diagram.nodeTemplateMap = nodeMap;
        this.diagram.linkTemplateMap = linkMap;
        this.diagram.model = content;
    }

    @HostListener('dragover', ['$event'])
    onDragOver($event: any) {
        if ($event.target.className === 'dropzone') {
            // Disallow a drop by returning before a call to preventDefault:
            return;
        }
        $event.preventDefault();
    }
    @HostListener('drop', ['$event'])
    onDrop($event: any) {
        $event.preventDefault();

        if ($event.target.parentElement === this.diagram.div) {
            const can = $event.target;
            if (!$event.dataTransfer.getData('text')) {
                return;
            }
            const data = JSON.parse($event.dataTransfer.getData('text'));

            // if the target is not the canvas, we may have trouble, so just quit:
            if (!(can instanceof HTMLCanvasElement)) {
                return;
            }

            const bbox = can.getBoundingClientRect();
            let bbw = bbox.width;
            if (bbw === 0) {
                bbw = 0.001;
            }
            let bbh = bbox.height;
            if (bbh === 0) {
                bbh = 0.001;
            }
            const mx = $event.clientX - bbox.left * ((can.width / this.pixelratio) / bbw);
            const my = $event.clientY - bbox.top * ((can.height / this.pixelratio) / bbh);
            const point = this.diagram.transformViewToDoc(new go.Point(mx, my));

            if (data.type === ElementType.ENTITY) {
                this.createNode(
                    this.modellingToolkit.getEntityByName(data.name),
                    point
                );
            }
        }
    }

    createNode(entity: Entity, point: go.Point) {
        this.diagram.startTransaction('new node');

        const nodeData = {
            key: this.uuidv4(),
            category: entity.id,
            location: point
        };
        this.diagram.model.addNodeData(nodeData);
        this.diagram.commitTransaction('new node');
        this.modellingToolkit.nodeCreated(nodeData);
        // console.log(this.getEntityList(null));
    }

    createLink(data: RelationSelectionData) {
        this.diagram.startTransaction('new link');
        (<go.GraphLinksModel>this.diagram.model).addLinkData({
            from: data.fromEntity,
            to: data.toEntity,
            category: data.relation.id,
            uml_association_name: 'Test'
        });
        this.diagram.commitTransaction('new link');
    }

    getEntityList(filters) {
        return this.diagram.model.nodeDataArray.filter((nodeData: any) => {
            let retVal = nodeData.category === 'uml_class';
            if (typeof  filters !== 'undefined' && Array.isArray(filters)) {
                retVal = retVal && (filters.indexOf(nodeData.key) === -1);
            }
            return retVal;
        });
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

