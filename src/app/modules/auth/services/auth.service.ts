import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { AuthResponseModel, AuthState, LoginModel, RegisterModel, User } from '@modules/auth/models';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly endpoint: string = environment.backendUrl;
  private readonly jwtHelper: JwtHelperService = new JwtHelperService();
  private userStateSubject: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>({
    isLogged: false,
    user: null,
  });
  userState$: Observable<AuthState> = this.userStateSubject.asObservable();

  constructor(private http: HttpClient, private logger: NGXLogger) {}

  login({ email, password }: LoginModel): Observable<User> {
    return this.http
      .post<AuthResponseModel>(`${this.endpoint}login`, {
        email,
        password,
      })
      .pipe(
        map(({ accessToken }: AuthResponseModel) => accessToken),
        tap((accessToken: string) => this.logger.debug('Access token: ', accessToken)),
        map((accessToken: string) => this.jwtHelper.decodeToken(accessToken)),
        map((decodedToken: { sub: number; email: string }) => {
          const user: User = {
            id: decodedToken.sub,
            email: decodedToken.email,
          };
          this.userStateSubject.next({
            isLogged: true,
            user,
          });

          return user;
        }),
        tap((user: User) => this.logger.debug('User: ', user)),
        catchError((error: HttpErrorResponse) => {
          this.logger.error('Error: ', error);
          return throwError(error.error);
        }),
      );
  }

  register({ email, password }: RegisterModel): Observable<User> {
    return this.http
      .post<AuthResponseModel>(`${this.endpoint}register`, {
        email,
        password,
      })
      .pipe(
        map(({ accessToken }: AuthResponseModel) => accessToken),
        tap((accessToken: string) => this.logger.debug('Access token: ', accessToken)),
        map((accessToken: string) => this.jwtHelper.decodeToken(accessToken)),
        map((decodedToken: { sub: number; email: string }) => {
          const user: User = {
            id: decodedToken.sub,
            email: decodedToken.email,
          };
          this.userStateSubject.next({
            isLogged: true,
            user,
          });

          return user;
        }),
        tap((user: User) => this.logger.debug('User: ', user)),
        catchError((error: HttpErrorResponse) => {
          this.logger.error('Error: ', error);
          return throwError(error.error);
        }),
      );
  }
}
