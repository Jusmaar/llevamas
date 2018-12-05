import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { ProductCart } from '../services/class/product-cart.class';
import { CartService } from '../services/api/cart.service';
import { UserAuthService } from '../services/helper/user-auth.service';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  cart: ProductCart[] = [];
  subCart: Subscription;
  total: number = 0;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private cartService: CartService,
    private userAuthService: UserAuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.cart = this.cartService.get();
      this.subCart = this.cartService.cart.subscribe((res: ProductCart[]) => {
        this.cart = res;
        this.calcularTotal(this.cart);
      });
      this.calcularTotal(this.cart);
    }
  }

  cambio($event: number, index: number): void {
    this.cart[index].cantidad = $event;
    this.calcularTotal(this.cart);
    this.cartService.set(this.cart);
  }

  delete(index: number): void {
    this.cart.splice(index, 1);
    this.calcularTotal(this.cart);
    this.cartService.set(this.cart);
  }

  deleteAll(): void {
    this.cart = [];
    this.calcularTotal(this.cart);
    this.cartService.set(this.cart);
  }

  calcularTotal(cart: ProductCart[]): void {
    let total = 0;
    cart.forEach((obj: ProductCart) => {
      total += (obj.priceNow * obj.cantidad);
    });
    this.total = total;
  }

  goToCheckout(): void {
    if (this.userAuthService.getStatic()) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login'], { queryParams: { next: 'checkout' } });
    }
  }

  ngOnDestroy(): void {
    if (this.subCart) {
      this.subCart.unsubscribe();
    }
  }

}
