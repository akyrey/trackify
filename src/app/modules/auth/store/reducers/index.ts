import { AppState } from '@app/shared/store';
import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';
import {
  authenticationReducer,
  AuthenticationStatusState,
  authenticationStatusStateKey,
} from './authentication.reducer';
import { loginReducer, LoginState, loginStateKey } from './login.reducer';
import { registerReducer, RegisterState, registerStateKey } from './register.reducer';

export const authenticationFeatureStateKey = 'authentication';

export interface AuthenticationState {
  [authenticationStatusStateKey]: AuthenticationStatusState;
  [loginStateKey]: LoginState;
  [registerStateKey]: RegisterState;
}

export interface AuthenticationFeatureState extends AppState {
  [authenticationFeatureStateKey]: AuthenticationState;
}

export function authenticationReducers(state: AuthenticationState | undefined, action: Action) {
  return combineReducers({
    [authenticationStatusStateKey]: authenticationReducer,
    [loginStateKey]: loginReducer,
    [registerStateKey]: registerReducer,
  })(state, action);
}

export const selectAuthenticationFeatureState =
  createFeatureSelector<AuthenticationState>(authenticationFeatureStateKey);
