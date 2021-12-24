import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from '../actions/authentication.actions';

export const loginStateKey = 'loginPage';

export interface LoginState {
  error: string | null;
  pending: boolean;
}

export const initialState: LoginState = {
  error: null,
  pending: false,
};

const reducer = createReducer(
  initialState,
  on(AuthenticationActions.login, (state) => ({ ...state, error: null, pending: true })),
  on(AuthenticationActions.loginFailure, (state, { error }) => ({ ...state, error, pending: false })),
  on(AuthenticationActions.loginRedirect, (state) => ({ ...state, pending: false })),
  on(AuthenticationActions.loginSuccess, (state) => ({ ...state, error: null, pending: false })),
  /*****************************************************************/
  on(AuthenticationActions.clearErrorMessage, (state) => ({ ...state, error: null, pending: false })),
);

export function loginReducer(state: LoginState = initialState, action: Action): LoginState {
  return reducer(state, action);
}

export const selectLoginErrorState = (state: LoginState) => state.error;
export const selectLoginPendingState = (state: LoginState) => state.pending;
