import { Component, OnInit } from '@angular/core';
import { GalleryFacade } from '@mf-app/shared/data-store';
@Component({
  selector: 'mf-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private galleryFacade: GalleryFacade) {}
  ngOnInit(): void {
    console.log('INITIALIZE')
    this.galleryFacade.init();
  }


}
