import {
  Injectable,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser, Location } from '@angular/common'
import { Response, URLSearchParams } from '@angular/http';
import { HttpClient } from './http-client.service';

import { Client, AuthClient } from '../class/client.class';

/* import { authConfig } from '../../services/config/auth.config'; */
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class UserAuthService {
  /* configObj: any = (new authConfig).config; */
  private isBrowser: boolean = isPlatformBrowser(this.platform_id);

  private authStatic: AuthClient;
  private auth: Subject<AuthClient> = new Subject<AuthClient>();

  code: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platform_id,
    private location: Location,
    private http: HttpClient
  ) {
    if (this.isBrowser) {
      let auth = localStorage.getItem('userauth');
      if (auth) {
        this.authStatic = JSON.parse(auth);
        /* setTimeout(() => {
          this.userStatic = JSON.parse(auth).user;
          this.set(new User(JSON.parse(auth).user));
          this.tokenStatic = JSON.parse(auth).token;
          this.setToken(JSON.parse(auth).token);
        }, 100) */
      } else {
        /* let params = new URLSearchParams(this.location.path(false).split('?')[1]);
        this.code = params.get('code');
        if (this.code) {
          this.loginProv(this.code, this.configObj.facebook.clientId, this.configObj.facebook.redirectURI, this.configObj.facebook.authEndpoint)
            .subscribe((data: UserAuth) => {
              this.set(data.user);
              this.setToken(data.token);
            });
        } */
      }
    }
  }

  /* loginProv(code: any, clientId: any, redirectURI: any, authEndpoint: any): Observable<UserAuth> {
    var body = {
      'code': code,
      'clientId': clientId,
      'redirectUri': redirectURI
    }

    return this.http.post(authEndpoint, JSON.stringify(body))
      .map((res: Response) => {
        const data = res.json();
        return new UserAuth(data);
      }).catch((err: Response | any) => {
        console.log('err : ', err);
        let errmsg: string;
        if (err instanceof Response) {
          errmsg = err.json() && err.json().msg || 'Tenemos problemas en el servidor.\nIntentelo más tarde';
        }
        return Observable.throw(errmsg);
      });
  } */

  /* loginFacebook(): void {
    if (this.isBrowser) {
      this.document.location.href = 'https://www.facebook.com/v2.8/dialog/oauth?client_id=' + this.configObj.facebook.clientId + '&redirect_uri=' + this.configObj.facebook.redirectURI + '&scope=email';
    }
  } */

  set(auth: AuthClient): void {
    this.authStatic = auth;
    this.auth.next(auth);
    if (this.isBrowser) {
      localStorage.setItem('userauth', JSON.stringify(this.getStatic()));
    }
  }

  getStatic(): AuthClient {
    return this.authStatic;
  }

  get(): Subject<AuthClient> {
    return this.auth;
  }

  loggedIn(): boolean {
    if (this.authStatic) {
      return true;
    } else {
      return false;
    }
  }

  /* get(): Subject<User> {
    return this.user;
  } */

  logout(): void {
    this.authStatic = null;
    this.auth.next(null);
    if (this.isBrowser) {
      localStorage.removeItem('userauth');
    }
  }

}
