import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeProductComponent} from './pages/home-product/home-product.component';
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AddProductComponent} from './pages/add-product/add-product.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    HomeProductComponent,
    AddProductComponent
  ],
  exports: [
    HomeProductComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ProductModule {
}
