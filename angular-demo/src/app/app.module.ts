import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UpgradeModule} from '@angular/upgrade/static';
import { HomeComponent } from './home/home.component';
import {RouterModule, UrlHandlingStrategy, UrlTree} from '@angular/router';
import {PhoneService} from './phone.service';
import {HttpClientModule} from '@angular/common/http';
import { PhoneListComponent } from './phone-list/phone-list.component';
import {FormsModule} from '@angular/forms';

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    const shouldProcess = url.toString() === '/home' ||
                          url.toString() === '/phones' ||
                          url.toString() === '/';
    console.log('CustomHandlingStrategy.shouldProcessUrl shouldProcess:', shouldProcess, url.toString());
    return shouldProcess;
  }

  extract(url: UrlTree): UrlTree {
    return url;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhoneListComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'phones',
        component: PhoneListComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ], {
        useHash: true,
        initialNavigation: true
    })
  ],
  providers: [
    PhoneService,
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
