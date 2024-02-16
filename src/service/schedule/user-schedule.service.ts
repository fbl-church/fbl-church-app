import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchedule } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserScheduleService {
  readonly BASE_PATH = 'api/users/schedule';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService,
    private readonly jwt: JwtService
  ) {}

  /**
   * Get a list of user schedules based on the params.
   *
   * @param params to filter on
   * @returns The list of user schedules
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<UserSchedule[]>> {
    return this.request.get<UserSchedule[]>(this.BASE_PATH, params);
  }

  /**
   * Get a list of user schedules based on the params.
   *
   * @param params to filter on
   * @returns The list of user schedules
   */
  getByUserId(userId: any): Observable<HttpResponse<UserSchedule[]>> {
    return this.request.get<UserSchedule[]>(this.BASE_PATH, new Map().set('userId', [userId]));
  }

  /**
   * Gets the currently logged in users schedule
   *
   * @returns The list of user schedules
   */
  getCurrentUserSchedule(params?: Map<string, string[]>): Observable<HttpResponse<UserSchedule[]>> {
    params = params
      ? params.set('userId', [this.jwt.getUserId().toString()])
      : new Map().set('userId', [this.jwt.getUserId().toString()]);
    return this.request.get<UserSchedule[]>(this.BASE_PATH, params);
  }
}
