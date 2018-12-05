import {
  Component,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';

import { Product } from '../../services/class/product.class';
import { ProductCart } from '../../services/class/product-cart.class';
import { CartService } from '../../services/api/cart.service';

import swal from 'sweetalert2';

@Component({
  selector: 'card-product-component',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit, OnDestroy {

  @Input() producto: Product
  isAdded: boolean = false;

  constructor(
    private service: CartService
  ) { }

  ngOnInit() {
    this.service.get().forEach((obj: ProductCart) => {
      if (this.producto.username === obj.username) {
        this.isAdded = true;
      }
    });
  }

  add(): void {
    if (!this.isAdded) {
      this.service.addToCart({
        product: this.producto,
        cantidad: 1
      });
      this.isAdded = true;
      swal(
        'Buen Trabajo',
        'El producto se añadio al carrito de compras',
        'success'
      )
    }
  }

  ngOnDestroy(): void { }

}
