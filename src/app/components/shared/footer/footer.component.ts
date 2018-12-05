import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { EmailValidator, MatchValidator } from '../../services/validators/ultis';

import { ClientService } from '../../services/api/client.service';
import { Subscription } from 'rxjs/Rx';

import swal from 'sweetalert2';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  formCreate: FormGroup;
  email: AbstractControl;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() { }

  submit() {

    if (this.formCreate.valid) {
      let subForm: Subscription = this.clientService.suscriptor(this.formCreate.value)
        .subscribe((res: any) => {
          swal(
            'Buen Trabajo',
            'Gracias por sucribirse.',
            'success'
          )
          this.createForm();
        }, (err: any) => {
          swal(
            'Ups',
            'Su email ya se encuentra suscrito.',
            'error'
          )
          this.createForm();
        });
    }
  }

  createForm() {
    this.formCreate = this.fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
    this.email = this.formCreate.controls['email'];
  }

}
