import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeProductComponent} from "./view/modules/product/pages/home-product/home-product.component";
import {AddProductComponent} from "./view/modules/product/pages/add-product/add-product.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeProductComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'edit-product/:id', component: AddProductComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
