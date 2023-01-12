import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  /**
   * Get's the full API URL
   *
   * @returns string of the full API url
   */
  getAPIUrl(): string {
    if (environment.isLocal) {
      return `http://${environment.apiUrl}`;
    } else {
      return `https://${environment.apiUrl}`;
    }
  }

  /**
   * Gets the API for socket calls
   *
   * @returns The url for the api web socket.
   */
  getSocketAPIUrl() {
    if (environment.isLocal) {
      return `ws://${environment.apiUrl}/subscription/socket`;
    } else {
      return `wss://${environment.apiUrl}/subscription/socket`;
    }
  }
}
