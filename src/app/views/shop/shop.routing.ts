import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByCategoryComponent } from './+productos/bycategory/bycategory.component';
import { BySearchComponent } from './+productos/bysearch/bysearch.component';

const routes: Routes = [
  {
    path: 'search/:name',
    component: BySearchComponent
  },
  {
    path: ':name',
    component: ByCategoryComponent
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
export class ShopRoutingModule { }
