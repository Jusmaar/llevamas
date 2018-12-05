import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string = 'app';
  menuMobile: boolean = false;
  menu: boolean = false;
  heightMenu: number;
  constructor() {
  }
  ngOnInit() {
    this.heightMenu = 225
  }
  showMenuMobile() {
    this.menuMobile = !this.menuMobile;
  }
  showMenu() {
    this.menu = !this.menu;
  }
  ngOnDestroy() { }

}