import { NavigationExtras } from '@angular/router';

export interface RouterModel {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
