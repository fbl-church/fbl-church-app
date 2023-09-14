import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridChecklistColumnComponent } from 'projects/insite-kit/src/component/grid/grid-checklist-column/grid-checklist-column.component';
import { ChildAttendance } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-edit-junior-church-children-check-in',
  templateUrl: './edit-junior-church-children-check-in.component.html',
})
export class EditJuniorChurchChildrenCheckInComponent
  implements OnInit, OnDestroy
{
  @ViewChild(GridChecklistColumnComponent)
  gridChecklistColumn: GridChecklistColumnComponent;

  attendanceChildren: ChildAttendance[];
  presentChildren: number[] = [];
  recordId: number;
  destroy = new Subject<void>();
  loading = true;

  childrenDataloader: any;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly attendanceRecordService: AttendanceRecordService,
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
        this.presentChildren = this.attendanceChildren.map((c) => c.id);
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

    const selectedChildrenIds = this.gridChecklistColumn.getSelected();
    let mappedChildren = [];
    if (selectedChildrenIds && selectedChildrenIds.length > 0) {
      mappedChildren = selectedChildrenIds.map((id) => {
        return { id: id };
      });
    }

    this.attendanceRecordService
      .updateChildren(this.recordId, mappedChildren)
      .subscribe({
        next: (res) => {
          this.popupService.success(
            'Attendance Record Children Successfully Updated!'
          );
          this.onBackClick();
        },
        error: () => {
          this.popupService.error(
            'Unable to update attendance record children at this time. Try again later.'
          );
          this.loading = false;
        },
      });
  }
}
