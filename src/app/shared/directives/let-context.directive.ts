import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LetContext } from '@shared/models';

@Directive({
  selector: '[ngLet]',
})
export class LetContextDirective<T> {
  @Input() ngLet: T | undefined;

  constructor(
    @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContextDirective<T>>,
  ) {
    viewContainerRef.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
