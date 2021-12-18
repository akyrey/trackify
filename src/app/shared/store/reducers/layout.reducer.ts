import { Action, createReducer, on } from '@ngrx/store';

import { LayoutActions } from '../actions';

export const layoutFeatureKey = 'layout';

export interface LayoutState {
  loading: boolean;
  mobileView: boolean;
  pageTitle: string;
  showNotifications: boolean;
  showSidenav: boolean;
}

export const initialState: LayoutState = {
  loading: false,
  mobileView: false,
  pageTitle: '',
  showNotifications: false,
  showSidenav: false,
};

const reducer = createReducer(
  initialState,
  on(LayoutActions.closeSidenav, (state) => ({ ...state, showSidenav: false })),
  on(LayoutActions.openSidenav, (state) => ({ ...state, showSidenav: true })),
  /*****************************************************************/
  on(LayoutActions.closeNotificationBar, (state) => ({ ...state, showNotifications: false })),
  on(LayoutActions.openNotificationBar, (state) => ({ ...state, showNotifications: true })),
  /*****************************************************************/
  on(LayoutActions.changeTitle, (state, { title }) => ({ ...state, pageTitle: title })),
  /*****************************************************************/
  on(LayoutActions.changeMobileView, (state, { mobile }) => ({ ...state, mobileView: mobile })),
  /*****************************************************************/
  on(LayoutActions.startLoading, (state) => ({ ...state, loading: true })),
  on(LayoutActions.stopLoading, (state) => ({ ...state, loading: false })),
);

export function layoutReducer(state: LayoutState = initialState, action: Action): LayoutState {
  return reducer(state, action);
}

export const selectLoadingState = (state: LayoutState) => state.loading;
export const selectMobileViewState = (state: LayoutState) => state.mobileView;
export const selectPageTitleState = (state: LayoutState) => state.pageTitle;
export const selectShowNotificationsState = (state: LayoutState) => state.showNotifications;
export const selectShowSidenavState = (state: LayoutState) => state.showSidenav;
