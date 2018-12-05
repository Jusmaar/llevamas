import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { EmailValidator, MatchValidator, CardValidator, CvvValidator, MonthValidator, YearValidator } from '../services/validators/ultis';

import { ProductCart } from '../services/class/product-cart.class';
import { Bill } from '../services/class/bill.class';
import { CartService } from '../services/api/cart.service';
import { BillService } from '../services/api/bill.service';

import { Subscription } from 'rxjs/Rx';

import swal from 'sweetalert2';

@Component({
  selector: 'checkout-component',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  description: string;
  metodoPago: boolean = true;
  cart: ProductCart[] = [];
  subCart: Subscription;
  total: number = 0;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  formCreate: FormGroup;
  provincia: AbstractControl;
  distrito: AbstractControl;
  direccion: AbstractControl;
  email: AbstractControl;

  formCreateCard: FormGroup;
  tarjeta: AbstractControl;
  cvv: AbstractControl;
  month: AbstractControl;
  year: AbstractControl;
  check: AbstractControl;

  loading: boolean = false;

  subBill: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private billService: BillService,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngOnInit() {
    if (this.isBrowser) {
      this.cart = this.cartService.get();
      this.subCart = this.cartService.cart.subscribe((res: ProductCart[]) => {
        this.cart = res;
        this.calcularTotal(this.cart);
      });
      this.calcularTotal(this.cart);
      this.createForm();
      this.createFormCard();
    }
  }

  ngOnDestroy() {
    if (this.subBill) {
      this.subBill.unsubscribe();
    }
  }

  calcularTotal(cart: ProductCart[]): void {
    let total = 0;
    cart.forEach((obj: ProductCart) => {
      total += (obj.priceNow * obj.cantidad);
    });
    this.total = total;
  }

  changeMetodoPago(num) {
    if (num == 1) {
      this.metodoPago = true;
      this.createFormCard();
    } else {
      this.metodoPago = false;
      this.createFormCard();
    }
  }

  comprar(): void {

    if (this.formCreate.valid) {
      if (!!this.formCreate.value.check) {
        this.loading = true;
        let productos = [];
        let total = 0;
        this.cart.forEach((obj) => {
          let bill_product: any = {
            priceId: obj.priceId,
            quantity: obj.cantidad,
            total: obj.priceNow * obj.cantidad
          }
          total += bill_product.total;
          productos.push(bill_product);
        });

        if (this.metodoPago) {
          this.description = 'Validando la tarjeta...'
          let newToken: any = {
            card_number: this.formCreateCard.value.tarjeta,
            cvv: this.formCreateCard.value.cvv,
            expiration_month: this.formCreateCard.value.month,
            expiration_year: this.formCreateCard.value.year,
            email: this.formCreate.value.email
          }

          let subCulqi: Subscription = this.billService.getTokenCulqi(newToken)
            .subscribe((res: any) => {
              this.description = 'Procesando la compra...'
              console.log('res: ', res);
              subCulqi.unsubscribe();
              let newBill: any = {
                token: res.id,
                productos: productos,
                total: total,
                province: this.formCreate.value.provincia,
                district: this.formCreate.value.distrito,
                address: this.formCreate.value.direccion,
                email: this.formCreate.value.email,
                metodoPago: 'culqi'
              }
              let subForm: Subscription = this.billService.create(newBill)
                .subscribe((res: Bill) => {
                  this.loading = false;
                  console.log('res: ', res);
                  subForm.unsubscribe();
                  swal(
                    'Buen Trabajo',
                    'Su compra se realizo con exito',
                    'success'
                  )
                  this.cartService.set([]);
                  this.router.navigate(['/']);
                }, (err: any) => {
                  this.loading = false;
                  subForm.unsubscribe();
                  swal(
                    'Ups',
                    err,
                    'error'
                  )
                })
            }, (err: any) => {
              swal(
                'Ups',
                err,
                'error'
              )
              this.loading = false;
              subCulqi.unsubscribe();
            });
        } else {
          this.description = 'Procesando la compra...';
          let newBill: any = {
            productos: productos,
            total: total,
            province: this.formCreate.value.provincia,
            district: this.formCreate.value.distrito,
            address: this.formCreate.value.direccion,
            email: this.formCreate.value.email,
            metodoPago: 'deposito'
          }
          let subForm: Subscription = this.billService.create(newBill)
            .subscribe((res: Bill) => {
              console.log('res: ', res);
              subForm.unsubscribe();
              this.loading = false;
              swal(
                'Buen Trabajo',
                'Su compra se realizo con exito',
                'success'
              )
              this.cartService.set([]);
              this.router.navigate(['/']);
            }, (err: any) => {
              this.loading = false;
              subForm.unsubscribe();
              swal(
                'Ups',
                err,
                'error'
              )
              console.log('err: ', err);
            });
        }
      } else {
        swal(
          'Ups',
          'Acepte los terminos y condiciones.',
          'error'
        )
      }
    }
  }

  createForm() {
    this.formCreate = this.fb.group({
      'provincia': ['', Validators.required],
      'distrito': ['', Validators.required],
      'direccion': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      'check': ['']
    });
    this.provincia = this.formCreate.controls['provincia'];
    this.distrito = this.formCreate.controls['distrito'];
    this.direccion = this.formCreate.controls['direccion'];
    this.email = this.formCreate.controls['email'];
    this.check = this.formCreate.controls['check'];
  }

  createFormCard() {
    this.formCreateCard = this.fb.group({
      'tarjeta': ['', Validators.compose([Validators.required, CardValidator.isValid])],
      'cvv': ['', Validators.compose([Validators.required, CvvValidator.isValid])],
      'month': ['', Validators.compose([Validators.required, MonthValidator.isValid])],
      'year': ['', Validators.compose([Validators.required, YearValidator.isValid])]
    });
    this.tarjeta = this.formCreateCard.controls['tarjeta'];
    this.cvv = this.formCreateCard.controls['cvv'];
    this.month = this.formCreateCard.controls['month'];
    this.year = this.formCreateCard.controls['year'];
  }

}
