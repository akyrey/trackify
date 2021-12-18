import { createAction, props } from '@ngrx/store';

export const openSidenav = createAction('[Layout] Open Sidenav');
export const closeSidenav = createAction('[Layout] Close Sidenav');
/*****************************************************************/
export const openNotificationBar = createAction('[Layout] Open Notification Bar');
export const closeNotificationBar = createAction('[Layout] Close Notification Bar');
/*****************************************************************/
export const changeTitle = createAction('[Layout] Change Title', props<{ title: string }>());
/*****************************************************************/
export const changeMobileView = createAction('[Layout] Change Mobile View', props<{ mobile: boolean }>());
/*****************************************************************/
export const startLoading = createAction('[Layout] Start Loading');
export const stopLoading = createAction('[Layout] Stop Loading');
/*****************************************************************/
