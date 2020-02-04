import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UpgradeModule} from '@angular/upgrade/static';
import { HomeComponent } from './home/home.component';
import {RouterModule, UrlHandlingStrategy, UrlTree} from '@angular/router';
import {PhoneService} from './phone.service';
import {HttpClientModule} from '@angular/common/http';

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    const shouldProcess = url.toString().startsWith('/home') || url.toString() === '/';
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
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
