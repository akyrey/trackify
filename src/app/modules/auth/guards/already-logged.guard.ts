import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { RouterActions } from '@app/shared/store';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AuthenticationFeatureState } from '../store/reducers';
import { AuthenticationSelectors } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class AlreadyLoggedGuard implements CanActivate, CanLoad {
  constructor(private store$: Store<AuthenticationFeatureState>) {}

  canActivate(): Observable<boolean> {
    return this.isAlreadyLogged();
  }

  canLoad(): Observable<boolean> {
    return this.isAlreadyLogged();
  }

  private isAlreadyLogged(): Observable<boolean> {
    return this.store$.select(AuthenticationSelectors.selectIsLogged).pipe(
      take(1),
      map((isLogged: boolean) => {
        if (isLogged) {
          this.store$.dispatch(RouterActions.go({ path: ['/'] }));
        }

        return !isLogged;
      }),
    );
  }
}
