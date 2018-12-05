import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { UserGuard } from '../services/guard/user-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [UserGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CheckoutRoutingModule { }
