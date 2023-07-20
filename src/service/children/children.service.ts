import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Child } from 'projects/insite-kit/src/model/child.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  readonly BASE_PATH = 'api/children';

  constructor(
    private readonly request: RequestService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Get a list of children based on the given request
   *
   * @param params to filter on
   * @returns List of Child objects
   */
  get(params?: Map<string, string[]>): Observable<HttpResponse<Child[]>> {
    return this.request.get<Child[]>(this.BASE_PATH, params).pipe(
      tap((v) =>
        v.body.forEach((u) => {
          u.formattedName = this.commonService.getFormattedName(u);
        })
      )
    );
  }

  /**
   * Get a child for a given child id
   *
   * @param params child id for the child to get
   * @returns Child object
   */
  getById(id: number): Observable<Child> {
    return this.request.get<Child>(`${this.BASE_PATH}/${id.toString()}`);
  }

  /**
   * Get the gurdians for the given child id.
   *
   * @param params gurdian id for the gurdian to get
   * @returns Gurdian object
   */
  getChildrenByGurdianId(gurdianId: number): Observable<HttpResponse<Child[]>> {
    return this.request
      .get<Child[]>(`${this.BASE_PATH}/gurdian/${gurdianId}`)
      .pipe(
        tap((v) =>
          v.body.forEach((u) => {
            u.formattedName = this.commonService.getFormattedName(u);
          })
        )
      );
  }

  /**
   * This will create a child for the given object, but will default to a child web role object.
   *
   * @param child The child to be created.
   * @returns The child that was created.
   */
  create(child: Child): Observable<Child> {
    return this.request.post<Child>(this.BASE_PATH, child);
  }

  /**
   * This will update the child's information for the given child object.
   *
   * @param id The id of the child
   * @param child The child information that needs updated.
   * @returns child object with the updated child object.
   */
  update(id: any, child: Child): Observable<Child> {
    return this.request.put<Child>(`${this.BASE_PATH}/${id}`, child);
  }

  /**
   * This will update the child's groups they are apart of
   *
   * @param id The id of the child
   * @param groups The groups to be added to the user
   * @returns child object with the updated child object.
   */
  updateChildGroups(id: any, groups: ChurchGroup[]): Observable<Child> {
    return this.request.put<Child>(`${this.BASE_PATH}/${id}/groups`, groups);
  }

  /**
   * Delete the child associated to the given id.
   *
   * @param id of the child to be deleted.
   */
  delete(id: number): Observable<any> {
    return this.request.delete<any>(`${this.BASE_PATH}/${id}`);
  }
}
