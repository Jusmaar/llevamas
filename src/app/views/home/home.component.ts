import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { EmailValidator, MatchValidator } from '../services/validators/ultis';

import { Product } from '../services/class/product.class';
import { Banner } from '../services/class/banner.class';

import { ProductService } from '../services/api/product.service';
import { ClientService } from '../services/api/client.service';
import { Subscription } from 'rxjs/Rx';

import swal from 'sweetalert2';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subProduct: Subscription;
  subBanner: Subscription;
  subDestacado: Subscription;
  productos: Product[] = [];
  destacados: Product[] = [];
  banners: Banner[] = [];
  modalNews: boolean = false;

  formCreate: FormGroup;
  email: AbstractControl;

  public isBrowser: boolean = isPlatformBrowser(this.platform_id);

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private clientService: ClientService,
    @Inject(PLATFORM_ID) private platform_id
  ) { }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.subProduct = this.service.get()
        .subscribe((res: Product[]) => {
          this.productos = res;
        }, (err: any) => {
          console.log('err: ', err);
        });

      this.subDestacado = this.service.get({
        destacado: true
      }).subscribe((res: Product[]) => {
        console.log(res);
        this.destacados = res;
      }, (err: any) => {
        console.log('err: ', err);
      });

      this.subBanner = this.service.getBanner()
        .subscribe((res: Banner[]) => {
          this.banners = res;
        }, (err: any) => {
          console.log('err: ', err);
        });

      if (!this.clientService.get()) {
        this.modalNews = true;
        this.createForm();
      }
    }
  }
  ngOnDestroy() {
    // this.modalNews=false;
    if (this.subBanner) {
      this.subBanner.unsubscribe();
    }
    if (this.subProduct) {
      this.subProduct.unsubscribe();
    }
    if (this.subDestacado) {
      this.subDestacado.unsubscribe();
    }
  }

  submit() {
    if (this.formCreate.valid) {
      let subForm: Subscription = this.clientService.suscriptor(this.formCreate.value)
        .subscribe((res: any) => {
          this.showModalNews();
          swal(
            'Buen Trabajo',
            'Gracias por sucribirse.',
            'success'
          )
        }, (err: any) => {
          console.log('any');
          this.showModalNews();
        })
    }
  }

  createForm() {
    this.formCreate = this.fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
    this.email = this.formCreate.controls['email'];
  }

  showModalNews() {
    this.modalNews = false;
    this.clientService.activar();
  }

}
