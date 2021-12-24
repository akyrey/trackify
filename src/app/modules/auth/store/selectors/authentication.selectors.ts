import { createSelector } from '@ngrx/store';
import { AuthenticationState, selectAuthenticationFeatureState } from '../reducers';
import { authenticationStatusStateKey, selectIsLoggedState, selectUserState } from '../reducers/authentication.reducer';

export const selectAuthenticationState = createSelector(
  selectAuthenticationFeatureState,
  (state: AuthenticationState) => state[authenticationStatusStateKey],
);

export const selectIsLogged = createSelector(selectAuthenticationState, selectIsLoggedState);
export const selectUser = createSelector(selectAuthenticationState, selectUserState);
