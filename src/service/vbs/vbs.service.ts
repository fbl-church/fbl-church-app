import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountStatus, Child, User } from 'projects/insite-kit/src/model/user.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VBSService {
  readonly BASE_VBS_PATH = 'api/vbs';

  constructor(private readonly request: RequestService, private readonly commonService: CommonService) {}

  /**
   * Get a list of guardian vbs children
   *
   * @param params to filter on
   * @returns User object
   */
  getGuardianVbsChildren(params?: Map<string, string[]>): Observable<HttpResponse<User[]>> {
    params = params ? params.set('status', [AccountStatus.ACTIVE]) : new Map().set('status', AccountStatus.ACTIVE);
    return this.request.get<Child[]>(`${this.BASE_VBS_PATH}/guardian/children`, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
        })
      )
    );
  }
}
