import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponenet {
  filterMobile:boolean=false;
  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  showFilterMenu(){
    this.filterMobile=!this.filterMobile;
  }

}
