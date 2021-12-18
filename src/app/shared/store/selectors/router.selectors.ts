import { RouterReducerState } from '@ngrx/router-store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { RouterStateUrl } from '@shared/utils';
import { AppState, selectRouterState } from '../reducers';

export const selectUrl: MemoizedSelector<AppState, string | null> = createSelector(
  selectRouterState,
  (state: RouterReducerState<RouterStateUrl> | undefined) => state?.state?.url || null,
);
