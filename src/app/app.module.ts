import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@core/containers';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { AuthModule } from '@modules/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { metaReducers, ROOT_REDUCERS } from '@shared/store';
import { ROOT_EFFECTS } from '@shared/store/effects';
import { CustomRouterStateSerializer } from '@shared/utils';
import { LoggerModule } from 'ngx-logger';
import { AppRoutingModule } from './app-routing.module';
import { extModules } from './build-specifics/index.prod';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
      },
    }),
    extModules,
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(ROOT_EFFECTS),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal, serializer: CustomRouterStateSerializer }),
    SharedModule.forRoot(),
    LoggerModule.forRoot({
      level: environment.ngxLoggerLevel,
    }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
