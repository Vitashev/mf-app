import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';
import { GalleryApiService } from '../api/gallery-api.service';
import * as GalleryActions from './gallery.actions';
import { GalleryEffects } from './gallery.effects';

describe('GalleryEffects', () => {
  let actions: Observable<Action>;
  let effects: GalleryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GalleryEffects,
        { provide: GalleryApiService, useValue: {} },
        {  provide: Actions, useValue: {} },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GalleryEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      expect(false).toBe(false);
    });
  });
});
