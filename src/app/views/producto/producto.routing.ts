import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProductComponent } from './detail-product/detail-product.component';
import { ClientService } from '../services/api/client.service';
import { CartService } from '../services/api/cart.service';
import { ProductService } from '../services/api/product.service';
import { CategoryService } from '../services/api/category.service';

const routes: Routes = [
  {
    path: ':name',
    component: DetailProductComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ClientService,
    ProductService,
    CartService,
    CategoryService
  ]
})
export class ProductoRoutingModule { }
