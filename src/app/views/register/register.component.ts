import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { EmailValidator, MatchValidator, PhoneValidator } from '../services/validators/ultis';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthClient, Client } from '../services/class/client.class';
import { ClientService } from '../services/api/client.service';

import { Subscription } from 'rxjs/Rx';

import swal from 'sweetalert2';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  next: string;

  formCreate: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  phone: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  repeatPwd: AbstractControl;
  check: AbstractControl;

  subRoute: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientService
  ) { }

  ngOnInit() {

    this.subRoute = this.route.queryParamMap
      .subscribe((res: any) => {
        if (res.params['next']) {
          this.next = res.params.next;
        }
      });

    this.createForm();
  }

  ngOnDestroy(): void {

  }

  submit(): void {

    if (this.formCreate.valid) {
      if (!!this.formCreate.value.check) {
        let subForm: Subscription = this.service.register(this.formCreate.value)
          .subscribe((res: Client) => {
            subForm.unsubscribe();
            swal(
              'Buen Trabajo',
              'Se registro de forma correcta.',
              'success'
            )
            if (this.next) {
              this.router.navigate([`/login`], { queryParams: { next: this.next } });
            } else {
              this.router.navigate(['/login']);
            }
          }, (err: any) => {
            subForm.unsubscribe();
            swal(
              'Error',
              err,
              'error'
            )
            console.log('err: ', err);
          })
      } else {
        swal(
          'Ups',
          'Acepte los terminos y condiciones.',
          'error'
        )
      }
    }
  }

  createForm(): void {
    this.formCreate = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phone': ['', Validators.compose([Validators.required, PhoneValidator.isValid])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      'password': ['', Validators.required],
      'repeatPwd': ['', Validators.required],
      'check': ['']
    }, { validator: MatchValidator.equalPassword('password', 'repeatPwd') });
    this.firstName = this.formCreate.controls['firstName'];
    this.lastName = this.formCreate.controls['lastName'];
    this.phone = this.formCreate.controls['phone'];
    this.email = this.formCreate.controls['email'];
    this.password = this.formCreate.controls['password'];
    this.repeatPwd = this.formCreate.controls['repeatPwd'];
    this.check = this.formCreate.controls['check'];
  }

}
