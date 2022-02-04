import { Component } from '@angular/core';

@Component({
  selector: 'mf-app-platform-entry',
  template: `<button (click)="logout()">Logout</button>
  <ul>
    <li routerLink="selected-cats">Selected pictures</li>
    <li routerLink="gallery">Pictures gallery</li>
  </ul>
  <router-outlet></router-outlet>
  `
})
export class RemoteEntryComponent {
  logout(): void {
    localStorage.removeItem('token');
    location.reload();
  }
}
