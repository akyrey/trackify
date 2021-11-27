import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES)],
})
export class AuthModule {}
