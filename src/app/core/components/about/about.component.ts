import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { NGXLogger } from 'ngx-logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit, OnDestroy {
  appName: string = environment.appName;
  appDeveloper: string = environment.appDeveloper;
  clickCounter: number = 0;
  developerModeClick: number = environment.developerModeClick;
  version: string = environment.version;

  constructor(private logger: NGXLogger) {}

  ngOnInit(): void {
    this.clickCounter = 0;
  }

  ngOnDestroy(): void {
    this.clickCounter = 0;
  }

  resetDevice(): void {
    // Service workers
    this.deleteServiceWorkers();
    // Storage
    this.deleteStorage();
    // Cookies
    this.deleteCookies();
  }

  /**
   * Remove all service workers.
   */
  private deleteServiceWorkers(): void {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations: readonly ServiceWorkerRegistration[]) => {
          if (registrations) {
            registrations.forEach((registration: ServiceWorkerRegistration) => registration.unregister());
          }
        })
        .finally(() => this.logger.info('AboutComponent->deleteServiceWorkers', 'Unregistered all service workers'));
    }
  }

  private deleteStorage(): void {
    // Local storage
    localStorage.clear();
    this.logger.info('AboutComponent->deleteStorage', 'Cleared local storage');
    // Session storage
    sessionStorage.clear();
    this.logger.info('AboutComponent->deleteStorage', 'Cleared session storage');
  }

  /**
   * Remove all cookies.
   */
  private deleteCookies(): void {
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie: string) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

    this.logger.info('AboutComponent->deleteCookies', 'Cleared all cookies');
  }

  incrementCounter(): void {
    this.clickCounter++;
  }
}
