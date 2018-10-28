import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { StallComponent } from './components/stall/stall.component';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';

const appRoutes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'stall',
        component: StallComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'edit',
        component: EditComponent
    }
];


@NgModule({
    declarations: [],

    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ],
    providers: []
    })
    export class RoutingModule { }