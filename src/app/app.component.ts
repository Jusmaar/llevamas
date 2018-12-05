import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { Category } from './services/class/category.class';
import { ProductCart } from './services/class/product-cart.class';
import { AuthClient } from './services/class/client.class';
import { CategoryService } from './services/api/category.service';
import { CartService } from './services/api/cart.service';
import { UserAuthService } from './services/helper/user-auth.service';

import { Subscription, Observable } from 'rxjs/Rx';
import { TopService } from './services/helper/top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('header') header: ElementRef;
  @ViewChild('search') search: ElementRef;
  topHeader: number;

  menuMobile: boolean = false;
  menu: boolean = false;
  userItems: boolean = false;
  heightMenu: number;

  categories: Category[] = [];
  cart: ProductCart[] = [];
  subCategory: Subscription;
  subCart: Subscription;
  subSearch: Subscription;

  auth: AuthClient
  subAuth: Subscription;
  subRouter: Subscription;

  searchJ: string;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private service: CategoryService,
    private cartService: CartService,
    private authService: UserAuthService,
    private topService: TopService,
    private router: Router,
    private _meta: Meta,
    private _title: Title,
    @Inject(PLATFORM_ID) private platform_id,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.topHeader = this.header.nativeElement.offsetTop;
      this.topService.set(this.topHeader);

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

  searchProduct() {
    console.log(this.searchJ)
    if (this.searchJ.length > 0) {
      this.router.navigate([`/shop/search/${this.searchJ}`]);
      this.searchJ = '';
    }
  }

  buscar(): void {
    console.log('click');
  }

  ngOnInit(): void {

    this.subRouter = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isBrowser) {
          window.scrollTo(0, 0)
        }
        switch (event.urlAfterRedirects) {
          case '/':
            this._title.setTitle('Tienda Virtual');
            this._meta.updateTag({ name: 'description', content: 'Tienda Virtual' });
            // this._meta.updateTag({ property: 'fb:pages', content: '1441702622591333' });
            this._meta.updateTag({ property: 'og:type', content: 'website' });
            this._meta.updateTag({ property: 'og:title', content: 'Tienda Virtual' });
            //this._meta.updateTag({ property: 'og:url', content: '' });
            this._meta.updateTag({ property: 'og:image', content: 'http://blog.easyguest.com.mx/wp-content/uploads/2017/01/portada-spa.jpg' });
            this._meta.updateTag({ property: 'og:description', content: 'Tienda Virtual' });
            this._meta.updateTag({ property: 'og:site_name', content: 'Tienda Virtual' });
            break;
        }
      }
    })

    if (this.isBrowser) {

      this.auth = this.authService.getStatic();
      this.subAuth = this.authService.get().subscribe((res: AuthClient) => {
        console.log('res auth: ', res);
        this.auth = res;
      }, (err: any) => {
        console.log('err: ', err);
      });

      this.subCategory = this.service.get()
        .subscribe((res: Category[]) => {
          this.categories = res;
          console.log(this.categories)
          this.heightMenu = 45 * this.categories.length;
        }, (err: any) => {
          console.log('err: ', err)
        });

      console.log(this.cart)
      this.cart = this.cartService.get();
      console.log(this.cart)
      this.subCart = this.cartService.cart.subscribe((res: ProductCart[]) => {
        this.cart = res;
      });
      /* this.heightMenu = 225 */
    }

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  logoutMobile() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMenu();
  }

  ngOnDestroy(): void {
    if (this.subCategory) {
      this.subCategory.unsubscribe();
    }
    if (this.subCart) {
      this.subCart.unsubscribe();
    }
    if (this.subAuth) {
      this.subAuth.unsubscribe();
    }
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
  }

  closeMenu(): void {
    this.menuMobile = false;
    this.menu = false;
  }

  showMenuMobile() {
    this.menuMobile = !this.menuMobile;
  }

  showMenu() {
    this.menu = !this.menu;
  }
  showUserItems() {
    this.userItems = !this.userItems;
  }
}
