import { Product } from './product.class';

export class ProductCart extends Product {
  cantidad: number;
  added: boolean;
  constructor(obj?: any) {
    super(obj.product);
    this.added = true;
    this.cantidad = obj && obj.cantidad || 1;
  }
}
