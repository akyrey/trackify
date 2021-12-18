import { createAction, props } from '@ngrx/store';
import { RouterModel } from '@shared/models';

export const go = createAction('[Router] Go', props<RouterModel>());
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
