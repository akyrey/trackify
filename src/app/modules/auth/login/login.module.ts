import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, loginContainers } from '@modules/auth/login/containers';
import { SharedModule } from '@shared/shared.module';

const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

const MATERIALS = [MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [loginContainers],
  imports: [CommonModule, MATERIALS, ReactiveFormsModule, SharedModule, RouterModule.forChild(LOGIN_ROUTES)],
})
export class LoginModule {}
