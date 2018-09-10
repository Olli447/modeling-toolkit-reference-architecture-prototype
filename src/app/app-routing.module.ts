import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LanguageSelectionComponent} from './frontend/language-selection/language-selection.component';
import {ModellingComponent} from './frontend/modelling/modelling.component';
import {NoLanguageSelectedComponent} from './frontend/no-language-selected/no-language-selected.component';

const routes: Routes = [
    { path: 'start', component: LanguageSelectionComponent },
    { path: 'modelling/:id', component: ModellingComponent},
    { path: 'modelling', component: NoLanguageSelectedComponent},
    { path: '', redirectTo: '/start', pathMatch: 'full'},
    { path: '**', redirectTo: '/start' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
