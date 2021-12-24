import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  logo: string | null = null;

  constructor(private fb: FormBuilder, private store$: Store<AuthenticationFeatureState>) {}

  ngOnInit(): void {
    this.error$ = this.store$.select(LoginSelectors.selectLoginError);
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  login(): void {
    if (this.form.valid) {
      const { email, password, remember } = this.form.value;
      this.store$.dispatch(AuthenticationActions.login({ email, password, remember }));
    }
  }
}
