import { createSelector } from '@ngrx/store';
import { AuthenticationState, selectAuthenticationFeatureState } from '../reducers';
import { registerStateKey, selectRegisterErrorState, selectRegisterPendingState } from '../reducers/register.reducer';

export const selectRegisterState = createSelector(
  selectAuthenticationFeatureState,
  (state: AuthenticationState) => state[registerStateKey],
);

export const selectRegisterError = createSelector(selectRegisterState, selectRegisterErrorState);

export const selectRegisterPending = createSelector(selectRegisterState, selectRegisterPendingState);
