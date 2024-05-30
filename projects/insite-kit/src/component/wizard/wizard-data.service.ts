import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class WizardDataService {
  dataChanged = new Subject<any>();
  data: any = {};

  /**
   * Updates the data.
   *
   * @param data The data
   * @param overwrite Optional parameter to overwrite the existing data
   */
  updateData(data: any): void {
    Object.assign(this.data, data);
    this.dataChanged.next(this.data);
  }

  /**
   * Clears the data.
   */
  clearData(): void {
    this.data = {};
    this.dataChanged.next(this.data);
  }
}
