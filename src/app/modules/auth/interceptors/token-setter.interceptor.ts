import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { concatMap, map, Observable, take } from 'rxjs';
import { User } from '../models';
import { AuthenticationFeatureState } from '../store/reducers';
import { AuthenticationSelectors } from '../store/selectors';

@Injectable()
export class TokenSetterInterceptor implements HttpInterceptor {
  constructor(private logger: NGXLogger, private store$: Store<AuthenticationFeatureState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.debug('Intercepted outgoing request', req);

    return this.store$.select(AuthenticationSelectors.selectUser).pipe(
      take(1),
      map((user: User | null) => user?.token),
      concatMap((token: string | undefined) => {
        if (!token) {
          return next.handle(req);
        }

        this.logger.debug('Adding token to request', token);
        const clonedRequest: HttpRequest<any> = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
          },
        });

        return next.handle(clonedRequest);
      }),
    );
  }
}
