import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ByCategoryComponent } from './+productos/bycategory/bycategory.component';
import { BySearchComponent } from './+productos/bysearch/bysearch.component';

import { SharedModule } from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { ProductService } from '../services/api/product.service';
import { ClientService } from '../services/api/client.service';
import { ShopRoutingModule } from './shop.routing';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports: [],
  declarations: [
    ByCategoryComponent,
    BySearchComponent
  ],
  providers: [
    ProductService,
    ClientService
  ]
})
export class ShopModule { }
