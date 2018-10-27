import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


const MODULES = [ 
    MatToolbarModule, MatButtonModule,
    MatFormFieldModule, MatInputModule,
    MatRadioModule, MatIconModule,
    MatMenuModule, MatCardModule,
    MatExpansionModule, MatTableModule,
    MatSelectModule,MatPaginatorModule,
    MatSortModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }
