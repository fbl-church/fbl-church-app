import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  readonly BASE_PATH = 'api/roles';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of users based on the given request
   *
   * @param params to filter on
   * @returns User object
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<any[]>> {
    return this.request.get<any[]>(this.BASE_PATH, params).pipe(
      map((v) => {
        const mappedRoles = [];
        v.body.forEach((r) =>
          mappedRoles.push({
            id: r,
            name: this.commonService.getFormattedRole(r),
          })
        );
        return new HttpResponse({ body: mappedRoles, headers: v.headers });
      })
    );
  }
}
