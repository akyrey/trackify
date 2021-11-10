import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, homeContainers } from './containers';

const HOME_ROUTES: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [homeContainers],
  imports: [CommonModule, SharedModule, RouterModule.forChild(HOME_ROUTES)],
})
export class HomeModule {}
