import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AlreadyLoggedGuard } from './guards';
import { authenticationEffets } from './store/effects';
import { authenticationFeatureStateKey, authenticationReducers } from './store/reducers';

const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canLoad: [AlreadyLoggedGuard],
    canActivate: [AlreadyLoggedGuard],
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canLoad: [AlreadyLoggedGuard],
    canActivate: [AlreadyLoggedGuard],
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature(authenticationEffets),
    StoreModule.forFeature(authenticationFeatureStateKey, authenticationReducers),
    RouterModule.forChild(AUTH_ROUTES),
  ],
})
export class AuthModule {}
