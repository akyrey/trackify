import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterService {
  private prevUrl: string | null = null;
  url$: Observable<string>;

  constructor(private location: Location, private router: Router) {
    router.events
      .pipe(
        filter((event: Event) => event instanceof RoutesRecognized),
        pairwise(),
      )
      .subscribe((event: Event[]) => (this.prevUrl = (event[0] as RoutesRecognized).urlAfterRedirects));
    this.url$ = router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      map((event: Event) => (event as NavigationEnd).url),
    );
  }

  navigateBack() {
    if (this.prevUrl) {
      return this.location.back();
    }

    return this.router.navigate(['/']);
  }
}
