import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  private mobileViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mobileView$: Observable<boolean> = this.loadingSubject.asObservable();
  private showSidenavSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showSidenav$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private location: Location, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.startLoading();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.stopLoading();
      }
    });
  }

  startLoading() {
    this.loadingSubject.next(true);
  }

  stopLoading() {
    this.loadingSubject.next(false);
  }

  openSideBar(): void {
    this.showSidenavSubject.next(true);
  }

  closeSideBar(): void {
    this.showSidenavSubject.next(false);
  }

  changeMobileView(isMobile: boolean): void {
    this.mobileViewSubject.next(isMobile);
  }
}
