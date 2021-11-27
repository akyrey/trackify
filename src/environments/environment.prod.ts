import { NgxLoggerLevel } from 'ngx-logger';
import packageInfo from '../../package.json';

export const environment = {
  appDeveloper: 'Akyrey',
  appName: 'Jack of all trades',
  backendUrl: 'http://localhost:3000/',
  developerModeClick: 7,
  logStoreState: false,
  ngxLoggerLevel: NgxLoggerLevel.DEBUG,
  production: true,
  version: packageInfo.version,
};
