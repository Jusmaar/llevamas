import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fixedTwo' })
export class PricePipe implements PipeTransform {
  transform(price: number) {
    return price.toFixed(2);
  }
}

@Pipe({ name: 'discount' })
export class DiscountPipe implements PipeTransform {
  transform(price: number) {
    return price.toFixed(0);
  }
}
