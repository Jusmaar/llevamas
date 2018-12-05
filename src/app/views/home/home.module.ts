import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home.routing';
import { ProductService } from '../services/api/product.service';
import { ClientService } from '../services/api/client.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
    HomeComponent
  ],
  providers: [
    ProductService,
    ClientService
  ]
})
export class HomeModule { }
