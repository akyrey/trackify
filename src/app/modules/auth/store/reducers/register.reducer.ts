import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from '../actions/authentication.actions';

export const registerStateKey = 'registerPage';

export interface RegisterState {
  error: string | null;
  pending: boolean;
}

export const initialState: RegisterState = {
  error: null,
  pending: false,
};

const reducer = createReducer(
  initialState,
  on(AuthenticationActions.register, (state) => ({ ...state, error: null, pending: true })),
  on(AuthenticationActions.registerFailure, (state, { error }) => ({ ...state, error, pending: false })),
  on(AuthenticationActions.registerSuccess, (state) => ({ ...state, error: null, pending: false })),
  /*****************************************************************/
  on(AuthenticationActions.clearErrorMessage, (state) => ({ ...state, error: null, pending: false })),
);

export function registerReducer(state: RegisterState = initialState, action: Action): RegisterState {
  return reducer(state, action);
}

export const selectRegisterErrorState = (state: RegisterState) => state.error;
export const selectRegisterPendingState = (state: RegisterState) => state.pending;
