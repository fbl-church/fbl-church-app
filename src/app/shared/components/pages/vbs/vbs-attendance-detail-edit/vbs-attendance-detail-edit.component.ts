import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-attendance-detail-edit',
  templateUrl: './vbs-attendance-detail-edit.component.html',
})
export class VBSAttendanceDetailEditComponent implements OnInit, OnDestroy {
  record: VBSAttendanceRecord;
  destroy = new Subject<void>();
  form: FormGroup;

  loading = true;
  vbsThemeGroups: VBSThemeGroup[] = [];

  constructor(
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly vbsThemeService: VBSThemesService,
    private readonly popupService: PopupService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map((res) => res.record.body),
        takeUntil(this.destroy)
      )
      .subscribe((rec) => {
        if (rec.status === AttendanceStatus.CLOSED) {
          this.popupService.error('VBS Attendance Record is Closed. Cannot update Information!');
          this.navigationService.navigate(`/vbs/themes/${rec.vbsThemeId}/attendance/${rec.id}`);
        }
        this.record = rec;
        this.buildForm();
        this.loading = false;
      });

    this.route.params
      .pipe(
        map((res) => res.id),
        switchMap((themeId) => this.vbsThemeService.getGroupsByThemeId(themeId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => {
        this.vbsThemeGroups = res.body.map((w) => {
          return { value: w.group, name: this.getFormattedGroupName(w) };
        });
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.record ? this.record.name : '', Validators.required],
      spiritTheme: [this.record?.spiritTheme ? this.record.spiritTheme : ''],
      offeringWinners: [this.record ? this.record.offeringWinners : []],
      activeDate: [
        this.record ? this.record.activeDate : this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
    });
  }

  onBackClick() {
    this.navigationService.back(`/vbs/themes/${this.record.vbsThemeId}/attendance/${this.record.id}`);
  }

  onUpdateClick() {
    this.loading = true;

    const newRecord: VBSAttendanceRecord = {
      name: this.form.value.name.trim(),
      spiritTheme: this.form.value.spiritTheme,
      activeDate: this.form.value.activeDate,
    };

    if (this.form.value.offeringWinners && this.form.value.offeringWinners.length > 0) {
      newRecord.offeringWinners = this.form.value.offeringWinners;
    }

    this.vbsAttendanceService.update(this.record.id, newRecord).subscribe({
      next: () => {
        this.onBackClick();
        this.popupService.success('VBS Attendance Record Successfully Updated!');
      },
      error: () => {
        this.popupService.error('Unable to update VBS Attendance Record. Try again later.');
        this.loading = false;
      },
    });
  }

  getFormattedGroupName(themeGroup: VBSThemeGroup) {
    const g = this.commonService.translate(themeGroup.group, TranslationKey.CHURCH_GROUP);
    return themeGroup.name ? `${themeGroup.name} - ${g}` : g;
  }
}
