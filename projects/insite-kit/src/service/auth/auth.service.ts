import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SplashScreenService } from 'src/app/shared/components/layouts/splash-screen-layout/splash-screen.service';
import { AuthToken } from '../../model/auth-token.model';
import { UserAccess } from '../../model/user-access.model';
import { RequestService } from '../request/request.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_AUTH_PATH = 'api';

  constructor(
    private readonly request: RequestService,
    private readonly jwt: JwtService,
    private readonly route: ActivatedRoute,
    private readonly splashScreenService: SplashScreenService
  ) {}

  /**
   * Authenticate a user and get a token for the user
   *
   * @param username of the user
   * @param password associated to the user
   * @returns
   */
  authenticate(email: string, password: string): Observable<string> {
    return this.request
      .post<AuthToken>(`${this.BASE_AUTH_PATH}/authenticate`, {
        email,
        password,
      })
      .pipe(
        tap((u) => this.jwt.setToken(u.token)),
        switchMap(() => this.route.queryParams),
        map((qp) => qp.redirect),
        tap(() => this.splashScreenService.setLoading(true)),
        take(1)
      );
  }

  /**
   * Re-Authenticates a user. Only works if they have an existing token.
   *
   * @returns The new Auth Token object
   */
  reauthenticate(): Observable<AuthToken> {
    return this.request
      .post<AuthToken>(`${this.BASE_AUTH_PATH}/reauthenticate`)
      .pipe(tap((u) => this.jwt.setToken(u.token)));
  }

  /**
   * Gets the current user access data.
   *
   * @returns The users current access data
   */
  userAccess(): Observable<UserAccess> {
    return this.request.get<UserAccess>(`${this.BASE_AUTH_PATH}/users/access`).pipe(map((res) => res.body));
  }
}
