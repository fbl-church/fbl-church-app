import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { AttendanceRecordService } from 'src/service/attendance/attendance-records.service';
import { ChildrenService } from 'src/service/children/children.service';
import { ChildCheckInModalComponent } from '../../modals/child-check-in-modal/child-check-in-modal.component';

@Component({
  selector: 'app-edit-junior-church-children-check-in',
  templateUrl: './edit-junior-church-children-check-in.component.html',
})
export class EditJuniorChurchChildrenCheckInComponent
  implements OnInit, OnDestroy
{
  @ViewChild(ChildCheckInModalComponent)
  checkInModal: ChildCheckInModalComponent;

  recordId: number;
  destroy = new Subject<void>();
  loading = true;

  childrenDataloader: any;
  modalChildSelection: Child;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly attendanceRecordService: AttendanceRecordService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap((p) => (this.recordId = p.id)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.childrenDataloader = (params) =>
          this.attendanceRecordService.getAttendanceChildrenById(
            this.recordId,
            params.set('present', [false])
          );
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

  onRowClick(event: Child) {
    this.checkInModal.open(event);
  }
}
