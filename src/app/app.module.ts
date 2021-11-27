import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
import { AuthModule } from '@modules/auth/auth.module';
import { LoggerModule } from 'ngx-logger';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@core/containers';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    SharedModule.forRoot(),
    LoggerModule.forRoot({
      level: environment.ngxLoggerLevel,
    }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
