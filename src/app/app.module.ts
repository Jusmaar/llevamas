import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from './services/helper/http-client.service';
import { HttpAuth } from './services/helper/http-auth.service';
import { UserAuthService } from './services/helper/user-auth.service';
import { UserGuard } from './services/guard/user-guard.service';
import { AuthGuard } from './services/guard/auth-guard.service';
import { CategoryService } from './services/api/category.service';
import { CartService } from './services/api/cart.service';
import { ClientService } from './services/api/client.service';
import { ProductService } from './services/api/product.service';
import { BillService } from './services/api/bill.service';

import { TopService } from './services/helper/top.service';

// import {NgxPaginationModule} from 'ngx-pagination';

export { AppComponent };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'tienda-dev-seo'
    }),
    AppRoutingModule,
    HttpModule,
    FormsModule,
    // NgxPaginationModule,
    NgbModule.forRoot(),
  ],
  providers: [
    HttpClient,
    HttpAuth,
    UserAuthService,
    UserGuard,
    AuthGuard,
    CategoryService,
    CartService,
    TopService,
    ClientService,
    ProductService,
    BillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
