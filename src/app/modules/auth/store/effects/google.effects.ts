/// <reference path="../../../../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../../../../node_modules/@types/gapi.auth2/index.d.ts" />

import { Injectable } from '@angular/core';
import { RouterActions } from '@app/shared/store';
import { environment } from '@env/environment';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { catchError, filter, from, map, mapTo, of, switchMap, tap } from 'rxjs';
import { googleUserFactory } from '../../models';
import { AuthenticationActions, GoogleActions } from '../actions';
import { AuthenticationFeatureState } from '../reducers';

declare var gapi: any;
const INIT_GOOGLE_EFFECTS = { type: '[Google] Init Google effects' };

@Injectable()
export class GoogleEffects implements OnInitEffects {
  private authentication: gapi.auth2.GoogleAuthBase | null = null;

  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store$: Store<AuthenticationFeatureState>,
  ) {}

  loadGoogleLibrary$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(INIT_GOOGLE_EFFECTS.type),
        tap(() =>
          gapi.load('auth2', {
            callback: () => {
              this.logger.debug('Completed loading Google API');
              this.store$.dispatch(GoogleActions.googleApiLoadComplete());
            },
            onerror: () => {
              this.logger.error('An error occurred loading Google API');
              this.store$.dispatch(GoogleActions.googleApiInitFailure({ error: 'Failed to load Google API' }));
            },
          }),
        ),
      ),
    { dispatch: false },
  );

  initGoogleAuthOnLoadComplete$ = createEffect(() =>
    this.actions$.pipe(ofType(GoogleActions.googleApiLoadComplete), mapTo(GoogleActions.googleApiLoad())),
  );

  initGoogleAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GoogleActions.googleApiLoad),
        tap(() =>
          gapi.auth2.init({ client_id: environment.googleClientId }).then(
            (authInstance: gapi.auth2.GoogleAuthBase) => {
              this.logger.debug('Google API setup complete');
              this.authentication = authInstance;
              this.store$.dispatch(GoogleActions.googleApiInitComplete());
            },
            (error: any) => {
              this.logger.error('An error occurred while loading Google API', error);
              this.store$.dispatch(GoogleActions.googleApiInitFailure({ error: 'Failed to load Google API' }));
            },
          ),
        ),
      ),
    { dispatch: false },
  );

  checkLoggedIn$ = createEffect(() =>
    this.actions$.pipe(ofType(GoogleActions.googleApiInitComplete), mapTo(AuthenticationActions.checkLoggedIn())),
  );

  checkUserAlreadyLogged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.checkLoggedIn),
      filter(() => !!this.authentication?.isSignedIn.get()),
      mapTo(this.authentication?.currentUser.get() ?? null),
      tap((user: gapi.auth2.GoogleUser | null) => this.logger.debug('Initial user', user)),
      map((user: gapi.auth2.GoogleUser | null) =>
        user
          ? AuthenticationActions.stillLoggedIn({
              user: googleUserFactory(user),
            })
          : AuthenticationActions.loginRedirect(),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      filter(() => !!this.authentication),
      switchMap(() =>
        from(this.authentication!.signIn()).pipe(
          map((user: gapi.auth2.GoogleUser) => {
            this.logger.debug('User logged in', user);
            return AuthenticationActions.loginSuccess({
              user: googleUserFactory(user),
            });
          }),
          catchError((error: any) => {
            this.logger.error(`An error occurred while logging in`, error);
            return of(AuthenticationActions.loginFailure({ error: 'Unable to log in' }));
          }),
        ),
      ),
    ),
  );

  redirectOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.stillLoggedIn, AuthenticationActions.loginSuccess),
      mapTo(RouterActions.go({ path: ['/'] })),
    ),
  );

  redirectOnError$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthenticationActions.loginRedirect), mapTo(RouterActions.go({ path: ['/login'] }))),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.logout),
      filter(() => !!this.authentication),
      switchMap(() =>
        from(this.authentication!.signOut()).pipe(
          map(() => {
            this.logger.debug('User successfully logged out');
            return AuthenticationActions.logoutSuccess();
          }),
          catchError((error: any) => {
            this.logger.error(`An error occurred while logging out`, error);
            return of(AuthenticationActions.logoutFailure({ error: 'Unable to log out' }));
          }),
        ),
      ),
    ),
  );

  afterLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.logoutSuccess, AuthenticationActions.logoutFailure),
      mapTo(AuthenticationActions.loginRedirect()),
    ),
  );

  ngrxOnInitEffects(): Action {
    return INIT_GOOGLE_EFFECTS;
  }
}
