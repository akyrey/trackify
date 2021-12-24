import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AuthenticationActions } from '../store/actions';
import { AuthenticationFeatureState } from '../store/reducers';
import { AuthenticationSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private store$: Store<AuthenticationFeatureState>) {}

  canActivate(): Observable<boolean> {
    return this.store$.select(AuthenticationSelectors.selectIsLogged).pipe(
      take(1),
      map((isLogged: boolean) => {
        if (!isLogged) {
          this.store$.dispatch(AuthenticationActions.loginRedirect());
        }

        return isLogged;
      }),
    );
  }
}
