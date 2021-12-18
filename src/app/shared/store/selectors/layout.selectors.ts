import { createSelector } from '@ngrx/store';
import { selectLayoutState } from '../reducers';
import {
  selectLoadingState,
  selectMobileViewState,
  selectPageTitleState,
  selectShowNotificationsState,
  selectShowSidenavState,
} from '../reducers/layout.reducer';

export const selectLoading = createSelector(selectLayoutState, selectLoadingState);
export const selectMobileView = createSelector(selectLayoutState, selectMobileViewState);
export const selectPageTitle = createSelector(selectLayoutState, selectPageTitleState);
export const selectShowSidenav = createSelector(selectLayoutState, selectShowSidenavState);
export const selectShowNotifications = createSelector(selectLayoutState, selectShowNotificationsState);
