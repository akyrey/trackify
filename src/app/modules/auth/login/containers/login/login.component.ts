import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginSelectors } from '@app/modules/auth/store/selectors';
import { environment } from '@env/environment';
import { AuthenticationActions } from '@modules/auth/store/actions';
import { AuthenticationFeatureState } from '@modules/auth/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  appName = environment.appName;
  error$!: Observable<string | null>;
  logo: string | null = null;

  constructor(private store$: Store<AuthenticationFeatureState>) {}

  ngOnInit(): void {
    this.error$ = this.store$.select(LoginSelectors.selectLoginError);
  }

  loginWithGoogle(): void {
    this.store$.dispatch(AuthenticationActions.login());
  }
}
