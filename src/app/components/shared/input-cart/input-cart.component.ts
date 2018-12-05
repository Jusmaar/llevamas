import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { FormControl } from '@angular/forms';
import { AbstractControl } from "@angular/forms/src/model";

import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'input-cart-component',
  template: `
    <input type="number" min="1"  [formControl]="newCantidad" >
  `,
  styles:[`
  input{
    // margin: 0 auto;
    width: 50px;
    border:1px solid $borderInput;
    color: darkgray;
    outline:none;
    text-align: center;
    &:focus{
      border:1px solid $secondary;    
    }
}
  `]
})
export class InputCartComponent implements OnInit, OnDestroy {

  @Input() cantidad: number;
  @Output() cambio: EventEmitter<number> = new EventEmitter<number>();
  newCantidad: FormControl = new FormControl();

  subForm: Subscription;

  constructor() { }

  ngOnInit(): void {
    /*     if (this.isBrowser) { */
    this.newCantidad.setValue(this.cantidad);
    this.subForm = this.newCantidad.valueChanges.subscribe((res: any) => {
      this.cambio.emit(res);
    });
    /* } */
  }

  ngOnDestroy(): void {
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
  }

}
