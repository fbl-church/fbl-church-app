import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChurchGroupService {
  readonly BASE_PATH = 'api/church-groups';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of church groups based on the given request
   *
   * @param params to filter on
   * @returns list of groups
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<any[]>> {
    return this.request.get<any[]>(this.BASE_PATH, params).pipe(
      map((v) => {
        const mappedGroups = [];
        v.body.forEach((cg) =>
          mappedGroups.push({
            id: cg,
            name: this.commonService.getFormattedChurchGroup(cg),
          })
        );
        return new HttpResponse({ body: mappedGroups, headers: v.headers });
      })
    );
  }
}
