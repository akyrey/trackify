import { createAction, props } from '@ngrx/store';

export const googleApiLoad = createAction('[Google] API load');
export const googleApiLoadComplete = createAction('[Google] API load complete');
export const googleApiLoadFailure = createAction('[Google] API load failure', props<{ error: string }>());

export const googleApiInit = createAction('[Google] API init');
export const googleApiInitComplete = createAction('[Google] API init complete');
export const googleApiInitFailure = createAction('[Google] API init failure', props<{ error: string }>());
