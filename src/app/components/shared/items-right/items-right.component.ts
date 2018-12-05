import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { ProductCart } from '../../services/class/product-cart.class';
import { CartService } from '../../services/api/cart.service';
import { TopService } from '../../services/helper/top.service';

import { Subscription, Observable } from 'rxjs/Rx';
import { HostListener } from '@angular/core';

@Component({
  selector: 'items-right-component',
  templateUrl: './items-right.component.html',
  styleUrls: ['./items-right.component.scss']
})
export class ItemsRightComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('search1') search: ElementRef;

  cart: ProductCart[] = [];
  subCart: Subscription;
  subTop: Subscription;
  subSearch: Subscription;
  searchA: string;
  top: number = 0;

  newItem: boolean = false;
  showItems: boolean = false;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private cartService: CartService,
    private topService: TopService,
    private router: Router,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (this.isBrowser) {
      let top = window.pageYOffset;
      if (top > this.top) {
        this.showItems = true;
      } else {
        this.showItems = false;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.subSearch = Observable.fromEvent(this.search.nativeElement, 'keyup')
        .filter((e: any) => e.keyCode === 13)
        .map((e: any) => e.target.value.trim().replace(/ +/g, ' '))
        .subscribe((res: string) => {
          if (res === '') {
            return
          } else {
            /* console.log('res: ', this.search.nativeElement.value); */
            this.search.nativeElement.value = '';
            this.router.navigate([`/shop/search/${res}`]);
          }
        });
    }
  }

  ngOnInit() {
    console.log('aqui');
    if (this.isBrowser) {
      this.cart = this.cartService.get();
      console.log('cart: ', this.cart);
      this.subCart = this.cartService.cart.subscribe((res: ProductCart[]) => {
        this.cart = res;
        console.log('this.cart2: ', this.cart);
        this.newItem = true;
        setTimeout(() => {
          this.newItem = false
        }, 500);
      });

      this.top = this.topService.getStatic();
      this.subTop = this.topService.get().subscribe((res: number) => {
        this.top = res;
      }, (err: any) => {
        console.log('err: ', err);
      });

    }
  }

  ngOnDestroy(): void {
    if (this.subCart) {
      this.subCart.unsubscribe();
    }
    if (this.subTop) {
      this.subTop.unsubscribe();
    }
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
  }

  searchProduct() {
    console.log(this.searchA);
    if (this.searchA.length > 0) {
      this.router.navigate([`/shop/search/${this.searchA}`]);
      this.searchA = '';
    }
  }

}
