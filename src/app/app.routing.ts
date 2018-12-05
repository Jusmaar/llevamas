import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'registro',
        loadChildren: './register/register.module#RegisterModule'
      },
      {
        path: 'shop',
        loadChildren: './shop/shop.module#ShopModule'
      },
      {
        path: 'producto',
        loadChildren: './producto/producto.module#ProductoModule'
      },
      {
        path: 'cart',
        loadChildren: './card/card.module#CardModule'
      },
      {
        path: 'checkout',
        loadChildren: './checkout/checkout.module#CheckoutModule'
      }
    ], {
        preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
