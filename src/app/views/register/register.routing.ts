import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthGuard } from '../services/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [AuthGuard]
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
export class RegisterRoutingModule { }
