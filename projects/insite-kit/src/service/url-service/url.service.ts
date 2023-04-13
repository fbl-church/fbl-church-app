import { Inject, Injectable } from '@angular/core';

/**
 * URL Service
 *
 * @author Sam Butler
 * @since Dec 15, 2020
 */
@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(@Inject('env') private env) {}

  /**
   * Get's the full API URL
   *
   * @returns string of the full API url
   */
  getAPIUrl(): string {
    if (this.env.isLocal) {
      return `http://${this.env.apiUrl}`;
    } else {
      return `https://${this.env.apiUrl}`;
    }
  }

  /**
   * Gets the API for socket calls
   *
   * @returns The url for the api web socket.
   */
  getSocketAPIUrl() {
    if (this.env.isLocal) {
      return `ws://${this.env.apiUrl}/subscription/socket`;
    } else {
      return `wss://${this.env.apiUrl}/subscription/socket`;
    }
  }
}
