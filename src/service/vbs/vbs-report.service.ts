import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSReportsService {
  readonly BASE_VBS_PATH = 'api/vbs/reports';

  constructor(private readonly request: RequestService) {}

  /**
   * Get a stats of children for a vbs theme id.
   *
   * @param id The vbs theme id
   */
  getChildrenStats(id: any): Observable<HttpResponse<any>> {
    return this.request.get<any>(`${this.BASE_VBS_PATH}/${id}/children`);
  }
}
