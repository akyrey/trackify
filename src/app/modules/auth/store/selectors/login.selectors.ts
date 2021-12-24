import { createSelector } from '@ngrx/store';
import { AuthenticationState, selectAuthenticationFeatureState } from '../reducers';
import { loginStateKey, selectLoginErrorState, selectLoginPendingState } from '../reducers/login.reducer';

export const selectLoginState = createSelector(
  selectAuthenticationFeatureState,
  (state: AuthenticationState) => state[loginStateKey],
);

export const selectLoginError = createSelector(selectLoginState, selectLoginErrorState);

export const selectLoginPending = createSelector(selectLoginState, selectLoginPendingState);
