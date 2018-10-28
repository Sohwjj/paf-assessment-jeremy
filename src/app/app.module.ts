import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { StallComponent } from './components/stall/stall.component';
import { MenuComponent } from './components/menu/menu.component';
import { RoutingModule } from './app.routing';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { ActionService } from './services/action.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StallComponent,
    MenuComponent,
    HomeComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [ActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
