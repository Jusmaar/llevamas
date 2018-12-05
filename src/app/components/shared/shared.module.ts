import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* COMPONENTES */
import { CardProductComponent } from './card_product/card-product.component';
import { FooterComponent } from './footer/footer.component';
import { ItemsRightComponent } from './items-right/items-right.component';
import { HeaderComponent } from './header/header.component';
import { InputCartComponent } from './input-cart/input-cart.component';
import { FilterComponenet } from './filter/filter.component';
import { LoadingComponent } from './loading/loading.component';

/* PIPES */
import { PricePipe, DiscountPipe } from './pipes/price.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CardProductComponent,
    FooterComponent,
    ItemsRightComponent,
    HeaderComponent,
    InputCartComponent,
    FilterComponenet,
    LoadingComponent,
    PricePipe,
    DiscountPipe
  ],
  exports: [
    CardProductComponent,
    FooterComponent,
    ItemsRightComponent,
    HeaderComponent,
    InputCartComponent,
    FilterComponenet,
    LoadingComponent,
    PricePipe,
    DiscountPipe
  ]
})
export class SharedModule { }
