import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DetailProductComponent } from './detail-product/detail-product.component';

import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { NgxGalleryModule } from 'ngx-gallery';

import { ProductService } from '../services/api/product.service';
import { ProductoRoutingModule } from './producto.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    NgxGalleryModule,
    ShareButtonsModule.forRoot(),
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    DetailProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductoModule { }
