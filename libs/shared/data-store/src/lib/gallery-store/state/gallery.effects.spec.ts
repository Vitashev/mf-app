import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

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
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GalleryEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GalleryActions.init() });

      const expected = hot('-a-|', {
        a: GalleryActions.loadGallerySuccess({ gallery: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
