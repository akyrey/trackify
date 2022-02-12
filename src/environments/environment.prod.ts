import { NgxLoggerLevel } from 'ngx-logger';
import packageInfo from '../../package.json';

export const environment = {
  appDeveloper: 'Akyrey',
  appName: 'Trackify',
  backendUrl: 'http://localhost:3000/',
  developerModeClick: 7,
  googleClientId: '334241442771-uvod90ccc3s016j9kcqf051qqtt2m8ot.apps.googleusercontent.com',
  logStoreState: false,
  ngxLoggerLevel: NgxLoggerLevel.DEBUG,
  production: true,
  version: packageInfo.version,
};
