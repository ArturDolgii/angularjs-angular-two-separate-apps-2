import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import IPhone from './interfaces/IPhone';
import {Observable} from 'rxjs';
import IPhoneDetail from './interfaces/IPhoneDetail';
import {downgradeInjectable} from '@angular/upgrade/static';

declare var angular;

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  constructor(@Inject(HttpClient) private http: HttpClient) { }

  query(): Observable<IPhone[]> {
    return this.http.get<IPhone[]>(`angular-phonecat/app/phones/phones.json`);
  }

  get(id: string): Observable<IPhoneDetail> {
    return this.http.get<IPhoneDetail>(`angular-phonecat/app/phones/${id}.json`);
  }
}

angular.module('core.phone', []).factory('Phone', downgradeInjectable(PhoneService));
