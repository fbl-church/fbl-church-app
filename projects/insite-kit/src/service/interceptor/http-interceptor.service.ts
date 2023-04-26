import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BasicHttpInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('auth-token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
    }
    return next.handle(req);
  }
}
