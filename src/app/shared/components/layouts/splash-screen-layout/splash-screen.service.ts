import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private readonly _loading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  listen() {
    return this._loading.asObservable();
  }

  setLoading(loading: boolean) {
    this._loading.next(loading);
  }
}
