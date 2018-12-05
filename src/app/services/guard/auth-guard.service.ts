import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, CanActivate } from '@angular/router';
import { UserAuthService } from '../helper/user-auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: UserAuthService,
    @Inject(DOCUMENT) private document: any
  ) { }

  canActivate(): boolean {
    if (this.service.loggedIn()) {
      this.document.body.scrollTop = 0;
      this.router.navigate(['/']);
      return false;
    } else {
      this.document.body.scrollTop = 0;
      return true;
    }
  }
}
