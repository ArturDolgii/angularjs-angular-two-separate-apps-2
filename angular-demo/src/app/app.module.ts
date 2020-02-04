import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UpgradeModule} from '@angular/upgrade/static';
import { HomeComponent } from './home/home.component';
import {RouterModule, UrlHandlingStrategy, UrlTree} from '@angular/router';

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
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
