import { createAction, props } from '@ngrx/store';
import { User } from '../../models';

export const checkLoggedIn = createAction('[Authentication] check logged in');
export const stillLoggedIn = createAction('[Authentication] still logged in', props<User>());

export const login = createAction('[Authentication] login', props<User>());
export const loginFailure = createAction('[Authentication] login failure', props<{ error: string }>());
export const loginSuccess = createAction('[Authentication] login success', props<User>());
export const loginRedirect = createAction('[Authentication] login redirect');

export const register = createAction('[Authentication] register', props<User>());
export const registerFailure = createAction('[Authentication] register failure', props<{ error: string }>());
export const registerSuccess = createAction('[Authentication] register success', props<User>());

export const clearErrorMessage = createAction('[Authentication] clear error message');

export const logout = createAction('[Authentication] logout');
