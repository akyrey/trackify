import { Injectable } from '@angular/core';
import { LocalStorage } from '@app/shared/models';
import { RouterActions } from '@app/shared/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bcrypt from 'bcryptjs';
import { NGXLogger } from 'ngx-logger';
import { map, tap } from 'rxjs';
import { AuthenticationActions } from '../actions';

const DEFAULT_USER = 'D_U_TK';

@Injectable()
export class AuthenticationEffects {
  checkLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.checkLoggedIn),
      map(() => {
        const savedDefaultUser = LocalStorage.getKey(DEFAULT_USER);

        if (!savedDefaultUser) {
          return AuthenticationActions.loginRedirect();
        }

        const savedUser = LocalStorage.getKey(savedDefaultUser);

        return savedUser ? AuthenticationActions.stillLoggedIn(savedUser) : AuthenticationActions.loginRedirect();
      }),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.register),
      map(({ email, password, remember }) => {
        if (!!LocalStorage.getKey(email)) {
          return AuthenticationActions.registerFailure({ error: 'User already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = { email, password: hashedPassword, remember };
        this.logger.debug(`Registered new user`, user);
        LocalStorage.setKey(email, user);
        return AuthenticationActions.registerSuccess(user);
      }),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      map(({ email, password, remember }) => {
        const savedUser = LocalStorage.getKey(email);
        const hashedPassword = bcrypt.hashSync(password, 10);

        if (!savedUser || !bcrypt.compare(savedUser.password, hashedPassword)) {
          this.logger.error(`Wrong username of password for ${email}`);
          return AuthenticationActions.loginFailure({ error: 'Wrong username or password' });
        }

        this.logger.debug(`Logging in user and remember me status`, savedUser, remember);
        return AuthenticationActions.loginSuccess({ ...savedUser, remember });
      }),
    ),
  );

  rememberUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthenticationActions.registerSuccess, AuthenticationActions.loginSuccess),
        tap(({ email, remember }) => {
          if (remember) {
            LocalStorage.setKey(DEFAULT_USER, email);
          } else {
            const currentDefaultUser = LocalStorage.getKey(DEFAULT_USER);
            if (currentDefaultUser === email) {
              LocalStorage.dropKey(DEFAULT_USER);
            }
          }
        }),
      ),
    { dispatch: false },
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loginSuccess, AuthenticationActions.registerSuccess),
      map(() => RouterActions.go({ path: ['/'] })),
    ),
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loginFailure),
      // tap(() => this.authService.disconnect()),
      // tap(() => this.tokenRemover()),
      map(() => RouterActions.go({ path: ['/login'] })),
    ),
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loginRedirect),
      // tap(() => this.tokenRemover()),
      map(() => RouterActions.go({ path: ['/login'] })),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.logout),
      map(() => {
        LocalStorage.dropKey(DEFAULT_USER);
        return AuthenticationActions.loginRedirect();
      }),
    ),
  );

  constructor(private actions$: Actions, private logger: NGXLogger) {}
}
