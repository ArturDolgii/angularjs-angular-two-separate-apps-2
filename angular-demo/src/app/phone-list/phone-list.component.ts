import IPhone from '../interfaces/IPhone';
import {Component, OnInit} from '@angular/core';
import {PhoneService} from '../phone.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: 'phone-list.template.html'
})
export class PhoneListComponent implements OnInit {
  public phones: IPhone[];
  public query: string;
  public orderProp: string;

  constructor(private Phone: PhoneService) {}

  public ngOnInit(): void {
    this.Phone.query().subscribe(phones => {
      this.phones = phones;
    });
    this.orderProp = 'age';
  }

  public getPhones(): IPhone[] {
    return this.sortPhones(this.filterPhones(this.phones));
  }

  private filterPhones(phones: IPhone[]) {
    if (phones && this.query) {
      return phones.filter(phone => {
        const name = phone.name.toLowerCase();
        const snippet = phone.snippet.toLowerCase();
        return name.indexOf(this.query) >= 0 || snippet.indexOf(this.query) >= 0;
      });
    }
    return phones;
  }

  private sortPhones(phones: IPhone[]) {
    if (phones && this.orderProp) {
      return phones
          .slice(0) // Make a copy
          .sort((a, b) => {
            if (a[this.orderProp] < b[this.orderProp]) {
              return -1;
            } else if ([b[this.orderProp] < a[this.orderProp]]) {
              return 1;
            } else {
              return 0;
            }
          });
    }
    return phones;
  }
}
