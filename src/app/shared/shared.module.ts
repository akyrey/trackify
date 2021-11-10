import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoggerModule } from 'ngx-logger';
import { sharedComponents } from './components';
import { sharedDirectives } from './directives';

const COMPONENTS: any[] = [...sharedComponents, ...sharedDirectives];

@NgModule({
  declarations: COMPONENTS,
  exports: [...COMPONENTS, CommonModule, FlexLayoutModule, LoggerModule],
  imports: [CommonModule, LoggerModule.forChild(), FlexLayoutModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
