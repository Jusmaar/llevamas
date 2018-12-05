import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../services/class/product.class';
import { ProductService } from '../../../services/api/product.service';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'bysearch-component',
  templateUrl: './bysearch.component.html',
  styleUrls: ['./bysearch.component.scss']
})
export class BySearchComponent implements OnInit, OnDestroy {

  productos: Product[] = [];
  subProducto: Subscription;
  subRoute: Subscription;
  p: number = 1;
  username: string;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngOnInit(): void {
    this.subRoute = this.route.params
      .subscribe((param: any) => {
        this.username = param.name;
        this.productos = [];
        this.subProducto = this.service.getBySearch(this.username)
          .subscribe((res: Product[]) => {
            this.productos = res;
          }, (err: any) => {
            console.log('err: ', err);
          });
      });
  }

  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
    if (this.subProducto) {
      this.subProducto.unsubscribe();
    }
  }

}
