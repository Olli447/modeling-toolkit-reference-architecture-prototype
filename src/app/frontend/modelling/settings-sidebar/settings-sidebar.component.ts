import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {SettingsDirective} from './settings.directive';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {Subscription} from 'rxjs/internal/Subscription';
import * as go from 'gojs';
import {Language} from '../../../classes/language';
import {SettingComponent} from '../../../classes/settingItem';
import {MatSidenav, MatSnackBar} from '@angular/material';
import {error} from 'util';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.scss']
})
export class SettingsSidebarComponent implements OnInit, OnDestroy {
  currentView: ComponentRef<Component>;
  settingComponents: { [key: string ]: Type<any> ; };

  @ViewChild(SettingsDirective)
  settingHost: SettingsDirective;

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

    this.nodeSelectedSubscription = this.modellingToolkit.nodeSelected$.subscribe((node: any) => this.onNodeSelected(node));
    this.linkSelectedSubscription = this.modellingToolkit.linkSelected$.subscribe((link: any) => this.onLinkSelected(link));
    this.nodeCreatedSubscription = this.modellingToolkit.nodeCreated$.subscribe((node: any) => this.onNodeSelected(node));
    this.linkCreatedSubscription = this.modellingToolkit.linkCreated$.subscribe((link: any) => this.onLinkSelected(link));

    this.partUnselectedSubscription = this.modellingToolkit.partUnselected$.subscribe(() => {
        this.close();
    });
    this.currentLanguageSubscription = this.modellingToolkit.currentLanguage$.subscribe((language: Language) => {
      this.settingComponents = language.settingComponents;
    });
  }

  ngOnDestroy(): void {
      this.nodeSelectedSubscription.unsubscribe();
      this.currentLanguageSubscription.unsubscribe();
  }

  public open(node: any) {
    this.onNodeSelected(node);
  }

  private onNodeSelected(node: any) {
    const component = this.settingComponents[node.category];
    // console.log(node);

    if (!component) {
      this.snackBar.open('There are no settings for this object', null, {
        duration: 1500
      });
      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.settingHost.viewContainerRef;
    viewContainerRef.clear();

    this.currentView = viewContainerRef.createComponent(componentFactory);
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
      this.modellingToolkit.modellingAreaComponent.diagram.clearSelection();
  }
}
