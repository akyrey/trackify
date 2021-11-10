import { NavlistComponent } from './navlist/navlist.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';

export const coreComponents: any[] = [
  AboutComponent,
  NavlistComponent,
  NotFoundComponent,
  ToolbarComponent,
  UserComponent,
];

export * from './about/about.component';
export * from './navlist/navlist.component';
export * from './not-found/not-found.component';
export * from './toolbar/toolbar.component';
export * from './user/user.component';
