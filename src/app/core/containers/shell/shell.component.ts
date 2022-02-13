import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/modules/auth/models';
import { AuthenticationActions } from '@app/modules/auth/store/actions';
import { AuthenticationSelectors } from '@app/modules/auth/store/selectors';
import { AppState, LayoutActions, LayoutSelectors, RouterActions, RouterSelectors } from '@app/shared/store';
import { AboutComponent } from '@core/components';
import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shell',
  styleUrls: ['./shell.component.scss'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit {
  appName: string = environment.appName || '';
  loading$: Observable<boolean> | undefined;
  mobileView$: Observable<boolean> | undefined;
  pageTitle$: Observable<string> | undefined;
  showSidenav$: Observable<boolean> | undefined;
  url$: Observable<string | null> | undefined;
  user$: Observable<User | null> | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private store$: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(untilDestroyed(this))
      .subscribe((breakpointState: BreakpointState) => {
        if (breakpointState.matches) {
          this.store$.dispatch(LayoutActions.closeSidenav());
          this.store$.dispatch(LayoutActions.changeMobileView({ mobile: true }));
        } else {
          this.store$.dispatch(LayoutActions.changeMobileView({ mobile: false }));
        }
      });
    this.loading$ = this.store$.select(LayoutSelectors.selectLoading);
    this.mobileView$ = this.store$.select(LayoutSelectors.selectMobileView);
    this.pageTitle$ = this.store$.select(LayoutSelectors.selectPageTitle);
    this.showSidenav$ = this.store$.select(LayoutSelectors.selectShowSidenav);
    this.url$ = this.store$.select(RouterSelectors.selectUrl);
    this.user$ = this.store$.select(AuthenticationSelectors.selectUser);
  }

  onOpenSidenav(): void {
    this.store$.dispatch(LayoutActions.openSidenav());
  }

  onCloseSideNav(): void {
    this.store$.dispatch(LayoutActions.closeSidenav());
  }

  onPreviousPage(): void {
    this.store$.dispatch(RouterActions.back());
  }

  onLogout(): void {
    this.store$.dispatch(LayoutActions.closeSidenav());
    this.store$.dispatch(AuthenticationActions.logout());
  }

  openAboutDialog(): void {
    this.dialog.open(AboutComponent, {
      width: '400px',
    });
  }
}
