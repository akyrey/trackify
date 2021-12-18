import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '@core/components';
import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LayoutService, RouterService } from '@shared/services';
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
  showSidenav$: Observable<boolean> | undefined;
  url$: Observable<string | null> | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private routerService: RouterService,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(untilDestroyed(this))
      .subscribe((breakpointState: BreakpointState) => {
        if (breakpointState.matches) {
          this.layoutService.closeSideBar();
          this.layoutService.changeMobileView(true);
        } else {
          this.layoutService.changeMobileView(false);
        }
      });
    this.loading$ = this.layoutService.loading$;
    this.mobileView$ = this.layoutService.mobileView$;
    this.showSidenav$ = this.layoutService.showSidenav$;
    this.url$ = this.routerService.url$;
  }

  onOpenSidenav(): void {
    this.layoutService.openSideBar();
  }

  onCloseSideNav(): void {
    this.layoutService.closeSideBar();
  }

  onPreviousPage(): void {
    this.routerService.navigateBack();
  }

  onLogout(): void {
    // TODO: implement
  }

  openAboutDialog(): void {
    this.dialog.open(AboutComponent, {
      width: '400px',
    });
  }
}
