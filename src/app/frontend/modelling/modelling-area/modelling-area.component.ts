import {Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, AfterViewInit, HostListener} from '@angular/core';
import * as go from 'gojs';
import {LoadingStatus, LoadingStatusEvent} from '../../../core/classes/loadingStatusEvent';
import {LoadingScreenService} from '../../../service/loading-screen.service';
import {ModellingManagerService} from '../../../core/modelling-manager.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {AbstractEntity} from '../../../core/classes/abstractEntity';
import {ElementType} from '../../../core/classes/elementTypeEnum';
import {RelationSelectionData} from '../elements-sidebar/element-relation-selection/element-relation-selection.component';
import {SocketService} from '../../../core/socket.service';
@Component({
  selector: 'app-modelling-area',
  templateUrl: './modelling-area.component.html',
  styleUrls: ['./modelling-area.component.scss']
})

/**
 * This component implements GoJS and starts the modelling tool when the router loads the url
 * */
export class ModellingAreaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('diagramDiv', { static: true })
  private diagramRef: ElementRef;
  public diagram: go.Diagram = new go.Diagram();

  private routeSubscription: any;
  private languageID: string;

  private pixelratio: number;

    constructor
    (
        private loadingScreenService: LoadingScreenService,
        private modellingManager: ModellingManagerService,
        private modellingToolkit: ModellingToolkitService,
        private socket: SocketService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        const part1 = '54fe4ee3b01c28c702d95d76423d6cbc5cf07f21de8349a00a5042a3b95c6e172099bc2a01d68dc986ea5efa4e2dc8d8dc96397d914a0c3aee38d7d8';
        const part2 = '43eb81fdb53174b2440e128ca75420c691ae2ca2f87f23fb91e076a68f28d8f4b9a8c0985dbbf28741ca08b87b7d55370677ab19e2f98b7afd509e1';
        const part3 = 'a3f659db5eaeffa19fc6c25d49ff6478bee5977c1bbf2a3';
        (go as any).licenseKey = part1 + part2 + part3;
        const $ = go.GraphObject.make;
        // create a new Diagram
        this.diagram = new go.Diagram();

        // to calculate the position when a entity is dropped we need to set the pixelratio
        this.pixelratio = window.devicePixelRatio;

        // standard diagram setup
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.allowDrop = true;  // necessary for dragging from Palette
        this.diagram.undoManager.isEnabled = true;

        // If you change the model and haven't saved it yet you will be notified
        this.diagram.addModelChangedListener((event) => {
            if (event.propertyName === 'CommittedTransaction') {
                this.modellingToolkit.isModelDataUnsaved = true;
            }
        });

        // Fire the the events if a node has been doubleClicked, selected or created
        this.diagram.addDiagramListener('ObjectDoubleClicked',
            e => {
                const part = e.subject.part;
                if (part instanceof go.Node) {
                    this.modellingToolkit.nodeSelected(part.data);
                } else if (part instanceof go.Link) {
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
        this.diagram.addDiagramListener('PartCreated',
            e => {
                const part = e.subject.part;
                if (part instanceof go.Node) {
                    this.modellingToolkit.nodeCreated(part);
                }
            });

        // Just in case the component isn't destroyed directly we delete the content of the diagram, if you live this site
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                this.diagram.clear();
            }
        });

        socket.modelContent$.subscribe(value => {
          modellingManager.rawModelData = value;
          this.initModel
          (
            this.createNodeMap(),
            this.createLinkMap(),
            this.getModelContent()
          );
        });
    }

    /**
     * As soon as the component is initialized, do the setup and load the language and model
     * */
    ngOnInit() {
        // Setup references
        this.modellingToolkit.modellingAreaComponent = this;
        this.diagram.div = this.diagramRef.nativeElement;
        // Load the language identifier
        this.routeSubscription = this.route.params.subscribe(params => {
            // When loaded set the language
            this.languageID = params['id'];
            this.modellingToolkit.setLanguage(this.languageID);
            this.route.queryParams.subscribe(queryParams => {
              const collaboration = queryParams['collaboration'];
              if (this.modellingToolkit.currentModelID === undefined || collaboration !== this.modellingToolkit.currentModelID) {
                this.modellingToolkit.generateModelID(collaboration);
              }
            });


            this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.PENDING, null, 'Creating new model'));
            // setup the model. Load content if available
            this.initModel
            (
                this.createNodeMap(),
                this.createLinkMap(),
                this.getModelContent()
            );
            this.modellingToolkit.isModelDataUnsaved = false;
        });
    }

    /**
     * When everything is loaded and the UI had a few milliseconds to finish everything remove the loading screen
     * */
    ngAfterViewInit() {
        setTimeout(() => {
            this.loadingScreenService.updateLoadingScreenStatus(new LoadingStatusEvent(LoadingStatus.DONE, null, null));
            // set the unsaved flag to false (loading a model triggers the flag)
            this.modellingToolkit.isModelDataUnsaved = false;
            }, 200);
    }

    ngOnDestroy(): void {
        // We don't want memory leaks
        this.routeSubscription.unsubscribe();
    }

    /**
     * Loads the model. If there is nothing to be loaded create a new one
     * */
    getModelContent(): go.GraphLinksModel {
        let model = new go.GraphLinksModel();
        const rawData = this.modellingManager.rawModelData;
        if (!rawData || rawData === '') {
            return model;
        }

        // If loading failed (wrong language, wrong file) redirect to error page
        try {
            model = <go.GraphLinksModel>go.Model.fromJson(rawData);
        } catch (e) {
            this.modellingToolkit.isModelDataUnsaved = false;
            this.modellingManager.rawModelData = null;
            this.router.navigate(['/modelling']);
        }

        this.modellingManager.rawModelData = null;

        return model;
    }

    /**
     * Create NodeMap (available entities) from entities array (see {@link Language})
     * */
    createNodeMap(): go.Map<string, go.Node> {
        const map = new go.Map<string, go.Node>();
        const entities = this.modellingManager.getLanguageByID(this.languageID).entities;

        for (let i = 0; i < entities.length; i++) {
            // add unique identifier of item (as category) and the item's template to the nodeMap
            // the category decides which template should be loaded
            map.add(entities[i].id, <go.Node>entities[i].template);
        }

        return map;
    }

    /**
     * Create LinkMap (available relations) from relations array (see {@link Language})
     * */
    createLinkMap(): go.Map<string, go.Link> {
        const map = new go.Map<string, go.Link>();
        const relations = this.modellingManager.getLanguageByID(this.languageID).relations;

        for (let i = 0; i < relations.length; i++) {
            // add unique identifier of item (as category) and the item's template to the nodeMap
            // the category decides which template should be loaded
            map.add(relations[i].id, <go.Link>relations[i].template);
        }

        return map;
    }

    /**
     * This method does the setup of the model with the contents that were created beforehand
     * */
    initModel(nodeMap: go.Map<string, go.Node>, linkMap: go.Map<string, go.Link>, content: go.GraphLinksModel) {
        this.diagram.nodeTemplateMap = nodeMap;
        this.diagram.linkTemplateMap = linkMap;
        this.diagram.model = content;
    }

    // If you drag over the modelling area prevent default
    @HostListener('dragover', ['$event'])
    onDragOver($event: any) {
        if ($event.target.className === 'dropzone') {
            // Disallow a drop by returning before a call to preventDefault:
            return;
        }
        $event.preventDefault();
    }

    // If you drop over the modelling area handle drop
    @HostListener('drop', ['$event'])
    onDrop($event: any) {
        $event.preventDefault();

        // make sure the item was dropped in the right div
        if ($event.target.parentElement === this.diagram.div) {
            const can = $event.target;
            // if not data bound to drag-and-drop item: return
            if (!$event.dataTransfer.getData('text')) {
                return;
            }
            // make an object out of the data bound to the drag-and-drop item
            const data = JSON.parse($event.dataTransfer.getData('text'));

            // if the target is not the canvas, we may have trouble, so just quit:
            if (!(can instanceof HTMLCanvasElement)) {
                return;
            }

            // calculate drop position
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

    /**
     * Creates a node
     * */
    createNode(entity: AbstractEntity, point: go.Point) {
        this.diagram.startTransaction('new node');

        // everything gets a uuid
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

    /**
     * Creates a link
     * */
    createLink(data: RelationSelectionData) {
        this.diagram.startTransaction('new link');

        // links get also a uuid (that is not the normal behaviour of GoJS)
        const linkData = {
            key: this.uuidv4(),
            from: data.fromEntity,
            to: data.toEntity,
            category: data.relation.id
        };
        (<go.GraphLinksModel>this.diagram.model).addLinkData(linkData);
        this.diagram.commitTransaction('new link');
        this.modellingToolkit.linkCreated(linkData);
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

