import { Action } from '@ngrx/store';

import * as GalleryActions from './gallery.actions';
import { GalleryEntity } from './gallery.models';
import { State, initialState, reducer } from './gallery.reducer';

describe('Gallery Reducer', () => {
  const createGalleryEntity = (id: string, name = ''): GalleryEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Gallery actions', () => {
    it('loadGallerySuccess should return the list of known Gallery', () => {
      const gallery = [
        createGalleryEntity('PRODUCT-AAA'),
        createGalleryEntity('PRODUCT-zzz'),
      ];
      const action = GalleryActions.loadGallerySuccess({ gallery });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
