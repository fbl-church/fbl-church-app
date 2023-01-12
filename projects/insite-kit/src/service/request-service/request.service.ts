import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../url-service/url.service';

/**
 * Common Request Service
 *
 * @author Sam Butler
 * @since Dec 15, 2020
 */
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private readonly urlService: UrlService,
    private readonly http: HttpClient
  ) {}

  /**
   * Get request service that will add the given parameters provided
   * and call the given url.
   *
   * @param url to call
   * @param params params to add to endpoint
   * @returns observable of the passed in object
   */
  get<T>(url: string, params?: Map<string, string[]>): Observable<T> {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}?`;
    if (params) {
      params.forEach((value, key) => {
        endpoint = `${endpoint}${key}=${value}&`;
      });
    }
    return this.http.get<T>(endpoint.slice(0, -1));
  }

  /**
   * Post the given body to the passed in endpoint
   *
   * @param url to post body too
   * @param body to be posted to the endpoint
   * @returns observable of the passed in object
   */
  post<T>(url: string, body?: any): Observable<T> {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}`;
    return this.http.post<T>(endpoint, body);
  }

  /**
   * Put the given body to the passed in endpoint
   *
   * @param url to post body too
   * @param body to be posted to the endpoint
   * @returns observable of the passed in object
   */
  put<T>(url: string, body?: any): Observable<T> {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}`;
    return this.http.put<T>(endpoint, body);
  }

  /**
   * Delete the given data for the url.
   *
   * @param url The url to delete from.
   * @returns observable of the passed in object
   */
  delete<T>(url: string): Observable<T> {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}`;
    return this.http.delete<T>(endpoint);
  }

  /**
   * Perform a download on the called endpoint.
   *
   * @param url to call.
   * @param params params to add to endpoint.
   * @returns Blob donwload of the passed in object.
   */
  download(url: string, params?: Map<string, string[]>): Observable<Blob> {
    let endpoint = `${this.urlService.getAPIUrl()}/${url}?`;
    if (params) {
      params.forEach((value, key) => {
        endpoint = `${endpoint}${key}=${value}&`;
      });
    }
    return this.http.get(endpoint.slice(0, -1), {
      responseType: 'blob',
    });
  }
}
