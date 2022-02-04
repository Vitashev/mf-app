
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PlatformPocComponent } from './components/platform-poc/platform-poc.component';

@NgModule({
  declarations: [AppComponent, PlatformPocComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
