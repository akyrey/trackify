import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { AuthenticationActions } from '@modules/auth/store/actions';
import { AuthenticationFeatureState } from '@modules/auth/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  appName = environment.appName;
  error$: Observable<string | null> | undefined;
  form!: FormGroup;
  logo: string | null = null;

  constructor(private fb: FormBuilder, private store$: Store<AuthenticationFeatureState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
    // TODO: Add group validator for confirm fields
  }

  register(): void {
    if (this.form.valid) {
      const { email, password, remember } = this.form.value;
      // this.store$.dispatch(AuthenticationActions.register({ email, password, remember }));
    }
  }
}
