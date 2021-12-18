import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent, registerContainers } from '@modules/auth/register/containers';
import { SharedModule } from '@shared/shared.module';

const REGISTER_ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];

const MATERIALS = [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [registerContainers],
  imports: [CommonModule, MATERIALS, ReactiveFormsModule, SharedModule, RouterModule.forChild(REGISTER_ROUTES)],
})
export class RegisterModule {}
