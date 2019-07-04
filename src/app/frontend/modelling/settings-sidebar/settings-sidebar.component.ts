import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {SettingsDirective} from './settings.directive';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {Subscription} from 'rxjs/internal/Subscription';
import * as go from 'gojs';
import {Language} from '../../../core/classes/language';
import {SettingComponent} from '../../../core/classes/settingItem';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.scss']
})
/**
 * This component loads its content dynamically from the settingComponents Array (see: {@link Language}).
 * It only loads something if a according component is defined by the modelling language module.
 * If a entity or relation does not have any attributes you are notified.
 * */
export class SettingsSidebarComponent implements OnInit, OnDestroy {
  // The currently loaded Component
  currentView: ComponentRef<Component>;
  settingComponents: { [key: string ]: Type<any> ; };

  // The SettingsDirective enables us to dynamically load components
  @ViewChild(SettingsDirective, { static: true })
  settingHost: SettingsDirective;

  // needed to open and close the sidebar
  @Input()
  sidebar: MatSidenav;

  nodeSelectedSubscription: Subscription;
  linkSelectedSubscription: Subscription;
  partUnselectedSubscription: Subscription;
  nodeCreatedSubscription: Subscription;
  linkCreatedSubscription: Subscription;
  currentLanguageSubscription: Subscription;

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private modellingToolkit: ModellingToolkitService,
      private snackBar: MatSnackBar
              ) { }

  ngOnInit( ) {
    this.modellingToolkit.settingSidebarComponent = this;

    // If something is selected or created open sidebar
    this.nodeSelectedSubscription = this.modellingToolkit.nodeSelected$.subscribe((node: any) => this.onNodeSelected(node));
    this.linkSelectedSubscription = this.modellingToolkit.linkSelected$.subscribe((link: any) => this.onLinkSelected(link));
    this.nodeCreatedSubscription = this.modellingToolkit.nodeCreated$.subscribe((node: any) => this.onNodeSelected(node));
    this.linkCreatedSubscription = this.modellingToolkit.linkCreated$.subscribe((link: any) => this.onLinkSelected(link));

    // If part unselected close sidebar
    this.partUnselectedSubscription = this.modellingToolkit.partUnselected$.subscribe(() => {
        this.close();
    });
    // Update setting components if language changes
    this.currentLanguageSubscription = this.modellingToolkit.currentLanguage$.subscribe((language: Language) => {
      this.settingComponents = language.settingComponents;
    });
  }

  ngOnDestroy(): void {
    // Memory leaks are evil
      this.nodeSelectedSubscription.unsubscribe();
      this.currentLanguageSubscription.unsubscribe();
  }

  /**
   * Loads a component inside the settings sidebar
   * @param part The part that the component should belong to
   * */
  public open(part: any) {
    this.onNodeSelected(part);
  }

  /**
   * Loads a component inside the settings sidebar
   * @param node The node that the component should belong to
   * */
  private onNodeSelected(node: any) {
    // try to load the according component from the
    const component = this.settingComponents[node.category];
    // console.log(node);

      // if the value is null there is no component
    if (!component) {
      this.snackBar.open('There are no settings for this object', null, {
        duration: 1500
      });
      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    // get the container for the component from the directive
    const viewContainerRef = this.settingHost.viewContainerRef;
    // delete any old component
    viewContainerRef.clear();

    // create the component with a componentFactory
    this.currentView = viewContainerRef.createComponent(componentFactory);
    // pass the node data to the component
    (<SettingComponent>this.currentView.instance).data = node;
    this.sidebar.open();
  }


  private onLinkSelected(link: any) {
    this.onNodeSelected(link);
  }

  deleteButtonPressed() {
    // console.log(this.currentView.instance);
      (<any>this.currentView.instance).delete();
  }

  close() {
      this.currentView = null;
      this.sidebar.close();

      const viewContainerRef = this.settingHost.viewContainerRef;
      viewContainerRef.clear();
      this.modellingToolkit.clearSelection();
  }
}
