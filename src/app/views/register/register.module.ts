import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientService } from '../services/api/client.service';

import { RegisterRoutingModule } from './register.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  exports: [],
  declarations: [
    RegisterComponent
  ],
  providers: [
    ClientService
  ]
})
export class RegisterModule { }
