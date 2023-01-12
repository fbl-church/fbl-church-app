import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Notification } from 'projects/insite-kit/src/models/notification.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JwtService } from '../jwt-service/jwt.service';
import { UrlService } from '../url-service/url.service';
import { STOMP_SOCKET_CONFIG } from './stomp.config';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService extends RxStomp {
  private readonly SOCKET_URL = '/queue/user/notification';

  constructor(
    private readonly jwt: JwtService,
    private readonly urlService: UrlService
  ) {
    super();
  }

  /**
   * Initialize the socket connection. This will only initialize if the connection
   * is not already established.
   */
  init() {
    if (!this.active) {
      this.configure(STOMP_SOCKET_CONFIG);
      this.configure({
        brokerURL: `${this.urlService.getSocketAPIUrl()}?${this.jwt.getToken()}`,
      });
      this.activate();
    }
  }

  /**
   * Kill the websocket connection.
   */
  disconnect() {
    this.deactivate();
  }

  /**
   * This will listen to the websocket url for any request and show it to the
   * provided user.
   *
   * @param destination What socket path to listen too.
   * @param userSession Determines if the connection is unique to the user.
   * @returns Observable of the caught Notification object.
   */
  listen(des: string, userSession: boolean = false): Observable<Notification> {
    return this.subscriptionSession().pipe(
      switchMap((session) =>
        super
          .watch(this.buildSocketPath(des, session, userSession))
          .pipe(map((res: Message) => JSON.parse(res.body)))
      )
    );
  }

  /**
   * Builds out the socket path for the subscription. If the connection desires that it
   * be user specific then it will append the users unique sesion id to the
   * subscription call.
   *
   * @param des Where the subscription should take place.
   * @param ses The unique user session id.
   * @returns String of the built socket path.
   */
  buildSocketPath(des: string, uuid: string, userSes: boolean): string {
    return userSes ? `${des}-${uuid}` : des;
  }

  /**
   * Gets the session id for the user. This will be a UUID that will
   * only belong to this user logged in.
   *
   * @returns Observable of the session id.
   */
  subscriptionSession() {
    return this.serverHeaders$.pipe(map((session) => session['user-name']));
  }
}
