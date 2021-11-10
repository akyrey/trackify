import { NgxLoggerLevel } from 'ngx-logger';
import packageInfo from '../../package.json';

export const environment = {
  appDeveloper: 'Akyrey',
  appName: 'Jack of all trades',
  developerModeClick: 7,
  logStoreState: false,
  ngxLoggerLevel: NgxLoggerLevel.DEBUG,
  production: true,
  version: packageInfo.version,
};
