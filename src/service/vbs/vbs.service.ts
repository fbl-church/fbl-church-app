import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountStatus, Child, User, VBSRegistration } from 'projects/insite-kit/src/model/user.model';
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

  /**
   * Get a children for a given request
   *
   * @param params child id for the child to get
   * @returns Child object
   */
  getChildren(params?: Map<string, string[]>): Observable<HttpResponse<Child[]>> {
    return this.request.get<Child[]>(`${this.BASE_VBS_PATH}/children`, params).pipe(
      tap((v) =>
        v.body.forEach((c) => {
          c.formattedName = this.commonService.getFormattedName(c);
        })
      )
    );
  }

  /**
   * Register the given children
   *
   * @param registration The registration structure
   * @returns The processed request
   */
  registerChildren(registration: VBSRegistration): Observable<any> {
    return this.request.post<any>(`${this.BASE_VBS_PATH}/register`, registration);
  }
}
