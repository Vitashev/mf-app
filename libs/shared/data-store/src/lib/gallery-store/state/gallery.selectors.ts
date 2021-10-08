import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GALLERY_FEATURE_KEY, State, galleryAdapter } from './gallery.reducer';

// Lookup the 'Gallery' feature state managed by NgRx
export const getGalleryState =
  createFeatureSelector<State>(GALLERY_FEATURE_KEY);

const { selectAll, selectEntities } = galleryAdapter.getSelectors();

export const getGalleryLoaded = createSelector(
  getGalleryState,
  (state: State) => state.loaded
);

export const getSelectedCats = createSelector(
  getGalleryState,
  (state: State) => state.selectedCats
);

export const getGalleryError = createSelector(
  getGalleryState,
  (state: State) => state.error
);

export const getAllGallery = createSelector(getGalleryState, (state: State) =>
  selectAll(state)
);

export const getGalleryEntities = createSelector(
  getGalleryState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGalleryState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getGalleryEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
