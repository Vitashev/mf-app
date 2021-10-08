import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GalleryActions from './gallery.actions';
import { GalleryEntity } from './gallery.models';

export const GALLERY_FEATURE_KEY = 'gallery';

export interface State extends EntityState<GalleryEntity> {
  selectedId?: string | number; // which Gallery record has been selected
  selectedCats: Map<string, any>;
  loaded: boolean; // has the Gallery list been loaded
  error?: string | null; // last known error (if any)
}

export interface GalleryPartialState {
  readonly [GALLERY_FEATURE_KEY]: State;
}

export const galleryAdapter: EntityAdapter<GalleryEntity> =
  createEntityAdapter<GalleryEntity>();

export const initialState: State = galleryAdapter.getInitialState({
  // set initial required properties
  selectedCats: new Map(),
  loaded: false,
});

const galleryReducer = createReducer(
  initialState,
  on(GalleryActions.toggleSelectCat, (state, { cat }) => {
    const newState = { ...state };
    if (newState.selectedCats.has(cat.id)) {
      newState.selectedCats.delete(cat.id);
    } else {
      newState.selectedCats.set(cat.id, cat);
    }

    return newState;
  }),
  on(GalleryActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GalleryActions.loadGallerySuccess, (state, { gallery }) =>
    galleryAdapter.setAll(gallery, { ...state, loaded: true })
  ),
  on(GalleryActions.loadGalleryFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return galleryReducer(state, action);
}
