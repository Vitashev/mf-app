import { TestBed } from '@angular/core/testing';

import { GalleryApiService } from './gallery-api.service';

describe('GalleryApiService', () => {
  let service: GalleryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
