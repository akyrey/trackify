import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_CANCEL, ROUTER_ERROR, ROUTER_NAVIGATED, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { map, switchMap } from 'rxjs/operators';
import { LayoutActions } from '../actions';

@Injectable()
export class LayoutEffects {
  startLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      map(() => LayoutActions.startLoading()),
    ),
  );

  stopLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED, ROUTER_CANCEL, ROUTER_ERROR),
      switchMap(() => [LayoutActions.stopLoading(), LayoutActions.closeSidenav()]),
    ),
  );

  constructor(private actions$: Actions) {}
}
