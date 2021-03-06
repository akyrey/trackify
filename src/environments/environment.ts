/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import { NgxLoggerLevel } from 'ngx-logger';
import packageInfo from '../../package.json';
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.

export const environment = {
  appDeveloper: 'Akyrey',
  appName: 'Trackify',
  backendUrl: 'http://localhost:3000/',
  developerModeClick: 7,
  googleClientId: '334241442771-uvod90ccc3s016j9kcqf051qqtt2m8ot.apps.googleusercontent.com',
  logStoreState: false,
  ngxLoggerLevel: NgxLoggerLevel.DEBUG,
  production: false,
  version: packageInfo.version,
};
