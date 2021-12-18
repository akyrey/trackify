import { InjectionToken } from '@angular/core';
import { environment } from '@env/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  MetaReducer,
} from '@ngrx/store';
import { RouterStateUrl } from '@shared/utils/router-state-serializer';
import { layoutFeatureKey, layoutReducer, LayoutState } from './layout.reducer';

export const routerFeatureKey = 'router';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  [layoutFeatureKey]: LayoutState;
  [routerFeatureKey]: RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    [layoutFeatureKey]: layoutReducer,
    [routerFeatureKey]: routerReducer,
  }),
});

/**
 * Console log every action with colors.
 *
 * @param {ActionReducer<AppState>} reducer
 *
 * @returns {ActionReducer<AppState>}
 */
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action): AppState => {
    if (environment.logStoreState) {
      const nextState = reducer(state, action);
      console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
      console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
      console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
      console.groupEnd();
      return nextState;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

export const selectRouterState: MemoizedSelector<AppState, RouterReducerState<RouterStateUrl>> = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>(routerFeatureKey);
export const selectLayoutState: MemoizedSelector<AppState, LayoutState> =
  createFeatureSelector<LayoutState>(layoutFeatureKey);
