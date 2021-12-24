import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationActions } from '@modules/auth/store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: '<router-outlet class="main"></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(AuthenticationActions.checkLoggedIn());
  }
}
