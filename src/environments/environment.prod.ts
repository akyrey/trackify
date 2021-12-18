import { NgxLoggerLevel } from 'ngx-logger';
import packageInfo from '../../package.json';

export const environment = {
  appDeveloper: 'Akyrey',
  appName: 'Trackify',
  backendUrl: 'http://localhost:3000/',
  developerModeClick: 7,
  logStoreState: false,
  ngxLoggerLevel: NgxLoggerLevel.DEBUG,
  production: true,
  version: packageInfo.version,
};
