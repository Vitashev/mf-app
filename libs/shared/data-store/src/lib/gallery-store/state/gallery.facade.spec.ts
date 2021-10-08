import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as GalleryActions from './gallery.actions';
import { GalleryEffects } from './gallery.effects';
import { GalleryFacade } from './gallery.facade';
import { GalleryEntity } from './gallery.models';
import {
  GALLERY_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './gallery.reducer';
import * as GallerySelectors from './gallery.selectors';

interface TestSchema {
  gallery: State;
}

describe('GalleryFacade', () => {
  let facade: GalleryFacade;
  let store: Store<TestSchema>;
  const createGalleryEntity = (id: string, name = ''): GalleryEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GALLERY_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GalleryEffects]),
        ],
        providers: [GalleryFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GalleryFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGallery$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGallery$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGallerySuccess` to manually update list
     */
    it('allGallery$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGallery$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GalleryActions.loadGallerySuccess({
          gallery: [createGalleryEntity('AAA'), createGalleryEntity('BBB')],
        })
      );

      list = await readFirst(facade.allGallery$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
