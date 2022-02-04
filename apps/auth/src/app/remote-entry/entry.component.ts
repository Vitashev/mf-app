import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mf-app-auth-entry',
  template: `<div class="remote-entry">
    <h2>auth's Remote Entry Component</h2>
  </div>
  <button (click)="login()">LOGIN TO APP</button>
  `,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  constructor(private act: ActivatedRoute) {}

  login(): void {
    localStorage.setItem('token', 'accepted');
    location.href = this.act.snapshot.root.queryParams.redirectUrl;
  }
}
