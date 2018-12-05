import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailValidator, MatchValidator } from '../services/validators/ultis';

import { AuthClient, Client } from '../services/class/client.class';
import { ClientService } from '../services/api/client.service';
import { UserAuthService } from '../services/helper/user-auth.service';

import { Subscription } from 'rxjs/Rx';

import swal from 'sweetalert2';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  next: string;

  formCreate: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  subRoute: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientService,
    private authService: UserAuthService
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

  submit(): void {
    if (this.formCreate.valid) {
      let subForm: Subscription = this.service.login(this.formCreate.value)
        .subscribe((res: AuthClient) => {
          this.authService.set(res);
          subForm.unsubscribe();
          if (this.next) {
            this.router.navigate([`/${this.next}`]);
          } else {
            this.router.navigate(['/']);
          }
        }, (err: any) => {
          console.log('err: ', err);
          swal(
            'Error',
            err,
            'error'
          )
          subForm.unsubscribe();
        });
    }
  }

  ngOnDestroy(): void { }

  createForm(): void {
    this.formCreate = this.fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      'password': ['', Validators.required]
    });
    this.email = this.formCreate.controls['email'];
    this.password = this.formCreate.controls['password'];
  }

}
