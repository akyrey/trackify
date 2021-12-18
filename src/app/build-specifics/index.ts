import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';

export const extModules = [
  StoreDevtoolsModule.instrument({
    logOnly: environment.production, // Restrict extension to log-only mode
    maxAge: 25, // Retains last 25 states
    name: environment.appName,
  }),
];
