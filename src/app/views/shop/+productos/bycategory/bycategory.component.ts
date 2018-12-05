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
import { Category } from '../../../services/class/category.class';
import { ProductService } from '../../../services/api/product.service';
import { CategoryService } from '../../../services/api/category.service';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'bycategory-component',
  templateUrl: './bycategory.component.html',
  styleUrls: ['./bycategory.component.scss']
})
export class ByCategoryComponent implements OnInit, OnDestroy {

  productos: Product[] = [];
  category: Category;
  subProducto: Subscription;
  subRoute: Subscription;
  subCategory: Subscription;
  p: number = 1;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private service: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngOnInit(): void {
    this.subRoute = this.route.params
      .subscribe((param: any) => {
        let username = param.name;
        this.category = null;
        this.productos = [];
        this.subCategory = this.categoryService.getByUsername(username)
          .subscribe((res: Category) => {
            this.category = res;
          }, (err: any) => {
            console.log('err: ', err);
          });
        this.subProducto = this.service.getByCategory(username)
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
    if (this.subCategory) {
      this.subCategory.unsubscribe();
    }
  }

}
