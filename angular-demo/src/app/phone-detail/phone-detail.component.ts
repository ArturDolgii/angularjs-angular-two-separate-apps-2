import IPhoneDetail from '../interfaces/IPhoneDetail';
import {Component, OnInit} from '@angular/core';
import {PhoneService} from '../phone.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-phone-detail',
  templateUrl: 'phone-detail.template.html'
})
export class PhoneDetailComponent implements OnInit {
  public phone: IPhoneDetail;
  public mainImageUrl: string;

  constructor(private route: ActivatedRoute,
              private Phone: PhoneService) {}

  public ngOnInit(): void {
    this.getPhone();
  }

  public getPhone(): void {
    this.route.params.subscribe(params => {
      this.Phone.get(params.id).subscribe((data: IPhoneDetail) => {
        this.phone = data;
        this.setImage(data.images[0]);
      });
    });
  }

  public setImage(imageUrl: string): void {
    this.mainImageUrl = imageUrl;
  }
}
