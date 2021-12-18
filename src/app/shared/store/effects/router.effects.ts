import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Data,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { environment } from '@env/environment.prod';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, map, mergeMap, pairwise, switchMap, tap } from 'rxjs/operators';
import { LayoutActions, RouterActions } from '../actions';

@Injectable()
export class RouterEffects {
  private prevUrl: string | null = null;

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.go),
        tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras })),
      ),
    { dispatch: false },
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => {
          if (this.prevUrl) {
            return this.location.back();
          }

          return this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(() => this.location.forward()),
      ),
    { dispatch: false },
  );

  updateTitle$ = createEffect(() =>
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap((route: ActivatedRoute) => route.data),
      map((data: Data) => data['title'] || ''),
      tap((title: string) => this.titleService.setTitle(`${environment.appName} - ${title}`)),
      map((title: string) => LayoutActions.changeTitle({ title })),
    ),
  );

  showSpinnerWhileNavigating$ = createEffect(() =>
    this.router.events.pipe(
      filter(
        (event: Event) =>
          event instanceof NavigationStart ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError,
      ),
      switchMap((event: Event) => {
        if (event instanceof NavigationStart) {
          return [LayoutActions.startLoading(), LayoutActions.closeSidenav()];
        }

        return of(LayoutActions.stopLoading());
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private titleService: Title,
  ) {
    router.events
      .pipe(
        filter((event: Event) => event instanceof RoutesRecognized),
        pairwise(),
      )
      .subscribe((event: Event[]) => (this.prevUrl = (event[0] as RoutesRecognized).urlAfterRedirects));
  }
}
