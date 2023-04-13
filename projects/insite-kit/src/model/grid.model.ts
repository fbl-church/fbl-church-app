import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export type GridDataloader = (params: any) => Observable<HttpResponse<any[]>>;

export type GridQueryParams = Map<string, string[]>;

export interface GridColumn {
  label?: string;
  field?: string;
}
