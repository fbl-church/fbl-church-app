import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-edit-junior-church-children-check-in',
  templateUrl: './edit-junior-church-children-check-in.component.html',
})
export class EditJuniorChurchChildrenCheckInComponent
  implements OnInit, OnDestroy
{
  attendanceChildren: ChildAttendance[];
  presentChildren: number[] = [];
  recordId: number;
  destroy = new Subject<void>();
  loading = true;

  childrenDataloader: any;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.childrenDataloader = (params) =>
      this.childrenService.get(
        params.set('churchGroup', [ChurchGroup.JUNIOR_CHURCH])
      );
  }

  ngOnInit() {
    this.route.params
      .pipe(
        tap((p) => (this.recordId = p.id)),
        switchMap((res) => this.route.data),
        map((res) => res.attendanceChildren.body),
        takeUntil(this.destroy)
      )
      .subscribe((rec) => {
        this.attendanceChildren = rec;
        this.presentChildren = this.attendanceChildren
          .filter((c) => c.present)
          .map((c) => c.id);
        console.log(this.attendanceChildren, this.presentChildren);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.router.navigate([`/junior-church/check-in/${this.recordId}/details`]);
  }

  onCancelClick() {
    this.onBackClick();
  }

  onUpdateClick() {
    this.loading = true;
  }
}
