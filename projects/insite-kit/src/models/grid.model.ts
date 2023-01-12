import { Observable } from 'rxjs';

export type GridDataObservable = Observable<any[]>;

export interface GridColumn {
  label?: string;
  field?: string;
}
