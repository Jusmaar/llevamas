import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  AfterViewInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

import { CartService } from '../../services/api/cart.service';
import { ProductService } from '../../services/api/product.service';
import { Product } from '../../services/class/product.class';
import { ProductCart } from '../../services/class/product-cart.class';
import { CONFIGPROD } from '../../services/config/config.constant';

import { Subscription } from 'rxjs/Rx';

import swal from 'sweetalert2';

@Component({
  selector: 'detail-product-component',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit, OnDestroy, AfterViewInit {

  url: string;

  cantidad: number = 1;
  index: number;
  isAdded: boolean = false;

  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '600px',
      height: '400px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    },
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    {
      breakpoint: 400,
      preview: true
    }
  ];
  galleryImages: NgxGalleryImage[];

  parrafos: string[] = [];
  cart: ProductCart[] = [];
  producto: Product;
  productos: Product[] = [];
  subProducto: Subscription;
  subProductos: Subscription;
  subRoute: Subscription;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private service: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private _meta: Meta,
    private _title: Title,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      try {
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.11&appId=741850742617437&autoLogAppEvents=1';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      } catch (error) {
        console.log('error');
      }
    }

  }

  ngOnInit(): void {

    this.subRoute = this.route.params
      .subscribe((param: any) => {
        let username = param.name;
        this.producto = null;
        this.subProducto = this.service.getByUsername(username)
          .subscribe((res: Product) => {
            console.log(res);
            this.producto = res;
            this.url = CONFIGPROD.urlFb + 'producto/' + res.username;
            /* SEO UPDATE */
            this._title.setTitle(`${this.producto.name} | Tienda Virtual`);
            this._meta.updateTag({ name: 'description', content: this.producto.description });
            // this._meta.updateTag({ property: 'fb:pages', content: '1441702622591333' });
            this._meta.updateTag({ property: 'og:type', content: 'website' });
            this._meta.updateTag({ property: 'og:title', content: `${this.producto.name} | Tienda Virtual` });
            //this._meta.updateTag({ property: 'og:url', content: '' });
            this._meta.updateTag({ property: 'og:image', content: this.producto.images[0] ? this.producto.images[0] : 'http://blog.easyguest.com.mx/wp-content/uploads/2017/01/portada-spa.jpg' });
            this._meta.updateTag({ property: 'og:description', content: this.producto.description });
            this._meta.updateTag({ property: 'og:site_name', content: 'Tienda Virtual' });
            /* SEO UPDATE */
            if (this.isBrowser) {
              this.cart = this.cartService.get();
              this.cart.forEach((obj: ProductCart, index: number) => {
                if (this.producto.username === obj.username) {
                  this.cantidad = obj.cantidad;
                  this.index = index;
                  this.isAdded = true;
                };
              });

              let images = [];
              this.producto.images.forEach((obj) => {
                images.push({
                  small: obj,
                  medium: obj,
                  big: obj
                })
              });
              this.galleryImages = images;
              this.parrafos = this.producto.description.split('\n');
              this.parrafos = this.parrafos.filter((obj) => obj.length > 0);
            }
          }, (err: any) => {
            console.log('err: ', err);
          });
      });

    if (this.isBrowser) {

      this.subProductos = this.service.get()
        .subscribe((res: Product[]) => {
          this.productos = res;
        }, (err: any) => {
          console.log('err: ', err);
        });
    }

  }

  ngOnDestroy(): void {
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
    if (this.subProducto) {
      this.subProducto.unsubscribe();
    }
    if (this.subProductos) {
      this.subProductos.unsubscribe();
    }
    if (this.isBrowser) {
      let script = document.getElementById('fb-root');
      if (script) {
        script.remove();
      }
    }
  }

  addCarrito(): void {
    console.log(this.isAdded);
    if (this.isAdded) {
      this.cart[this.index].cantidad = this.cantidad;
      console.log(this.cart[this.index]);
      this.cartService.set(this.cart);
      swal(
        'Buen Trabajo',
        'El producto se añadio al carrito de compras',
        'success'
      )
    } else {
      this.cartService.addToCart({
        product: this.producto,
        cantidad: this.cantidad
      })
      swal(
        'Buen Trabajo',
        'El producto se añadio al carrito de compras',
        'success'
      )
    }

  }

  add(): void {
    this.cantidad++
  }

  minus(): void {
    if (this.cantidad > 1) {
      this.cantidad--
    }
  }

}
