import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models';
import { AuthenticationActions } from '../actions';

export const authenticationStatusStateKey = 'status';

export interface AuthenticationStatusState {
  checking: boolean;
  isLogged: boolean;
  user: User | null;
}

export const authenticationInitialState: AuthenticationStatusState = {
  checking: false,
  isLogged: false,
  user: null,
};

const reducer = createReducer(
  authenticationInitialState,
  on(AuthenticationActions.checkLoggedIn, (state) => ({ ...state, checking: true })),
  on(AuthenticationActions.stillLoggedIn, (state) => ({ ...state, checking: false })),
  on(
    AuthenticationActions.loginSuccess,
    AuthenticationActions.registerSuccess,
    AuthenticationActions.stillLoggedIn,
    (state, user) => ({
      ...state,
      isLogged: true,
      user,
    }),
  ),
  on(AuthenticationActions.loginRedirect, () => authenticationInitialState),
  on(AuthenticationActions.logout, () => authenticationInitialState),
);

export function authenticationReducer(state: AuthenticationStatusState = authenticationInitialState, action: Action) {
  return reducer(state, action);
}

export const selectCheckingState = (state: AuthenticationStatusState) => state.checking;
export const selectIsLoggedState = (state: AuthenticationStatusState) => state.isLogged;
export const selectUserState = (state: AuthenticationStatusState) => state.user;
