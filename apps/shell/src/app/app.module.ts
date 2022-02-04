import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { GalleryStoreModule } from '@mf-app/shared/data-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard, SharedAuthModule } from '@mf-app/shared/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedAuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    GalleryStoreModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          canActivateChild: [AuthGuard],
          loadChildren: () =>
                import('platform/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('auth/Module').then((m) => m.RemoteEntryModule),
        }
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
