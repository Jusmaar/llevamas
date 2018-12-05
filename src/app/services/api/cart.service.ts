import {
  Injectable,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common'

import { Product } from '../class/product.class';
import { ProductCart } from '../class/product-cart.class';

import { Subject, Subscription } from 'rxjs/Rx';

@Injectable()
export class CartService {
  private isBrowser: boolean = isPlatformBrowser(this.platform_id);
  cartStatic: ProductCart[] = [];
  cart: Subject<ProductCart[]> = new Subject<ProductCart[]>();

  constructor(
    @Inject(PLATFORM_ID) private platform_id
  ) {
    if (this.isBrowser) {
      let cart = localStorage.getItem('cart');
      if (cart) {
        this.cartStatic = JSON.parse(cart);
        this.cart.next(JSON.parse(cart));
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
        this.cartStatic = [];
        this.cart.next([]);

      }
    }
  }

  addToCart(obj: any): void {
    if (this.isBrowser) {
      let newCart = new ProductCart(obj);
      let buff = this.cartStatic.find((obj1) => obj1.username === newCart.username);
      if (!buff) {
        this.cartStatic.push(newCart);
        this.cart.next(this.cartStatic);
        localStorage.setItem('cart', JSON.stringify(this.cartStatic));
      }
    }
  }

  get(): any {
    return JSON.parse(localStorage.getItem('cart'));
  }

  set(nuevo: ProductCart[]): void {
    this.cartStatic = nuevo;
    this.cart.next(nuevo);
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cartStatic));
    }
  }

  /* removeToCart(index: number): void {
    for (let i = 0; i < this.productosFav.length; i++) {
      if (this.productos[index].id === this.productosFav[i].productId) {
        this.productosFav[i].inCart = false;
        if (this.isBrowser) {
          localStorage.setItem('favorites', JSON.stringify(this.productosFav));
        }
        break;
      }
    }
    this.productos.splice(index, 1);
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.productos));
    }
  } */

  /* plusCart(index: number): void {
    this.productos[index].cantidad++;
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.productos));
    }
  }

  minusCart(index: number): void {
    if (this.productos[index].cantidad > 1) {
      this.productos[index].cantidad--;
      if (this.isBrowser) {
        localStorage.setItem('cart', JSON.stringify(this.productos));
      }
    }
  }

  getTotal(): number {
    let total = 0;
    this.productos.forEach((obj) => {
      total += (obj.cantidad * obj.priceNow);
    });
    return total;
  }

  checkOut(): void {
    this.productos = [];
    this.productSub.next(this.productos);
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.productos));
    }
  }

  get(): Cart[] {
    return this.productos;
  } */

}
