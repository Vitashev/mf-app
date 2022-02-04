import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HomeComponent} from '../components/home.component';
import { RemoteEntryComponent } from './entry.component';
import { AuthGuard, SharedAuthModule } from '@mf-app/shared/auth';

@NgModule({
  declarations: [RemoteEntryComponent, HomeComponent],
  imports: [
    BrowserModule,
    SharedAuthModule,
    RouterModule.forChild([
      {
        path: '',
        canActivateChild: [AuthGuard],
        component: RemoteEntryComponent,
        children: [
          {
            path: 'selected-cats',
            component: HomeComponent
          },
          {
            path: 'gallery',
            // component: PlatformPocComponent
            loadChildren: () =>
              import('gallery/Module').then((m) => m.RemoteEntryModule),
          }
        ]
      }
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
