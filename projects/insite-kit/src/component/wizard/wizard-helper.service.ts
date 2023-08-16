import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WizardHelperService {
  public eventHelper = new Subject<{ prev: boolean; next: boolean }>();
  constructor() {}
}
