import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CardComponent } from './card.component';

import { CardRoutingModule } from './card.routing';

import { ClientService } from '../services/api/client.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CardRoutingModule,
    FormsModule,
  ],
  exports: [],
  declarations: [
    CardComponent
  ],
  providers: [ ClientService]
})
export class CardModule { }
