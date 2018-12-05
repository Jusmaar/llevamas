import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CheckoutComponent } from './checkout.component';

import { BillService } from '../services/api/bill.service';

import { ClientService } from '../services/api/client.service';
import { CheckoutRoutingModule } from './checkout.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CheckoutRoutingModule
  ],
  exports: [],
  declarations: [
    CheckoutComponent
  ],
  providers: [
    BillService,
    ClientService
  ]
})
export class CheckoutModule { }
