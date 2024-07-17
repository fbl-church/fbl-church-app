import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
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

  baseRoute: string;
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
        tap((res) => (this.record = res.record.body)),
        tap((res) => (this.baseRoute = this.buildBaseRoute(res.route))),
        switchMap(() => this.vbsThemeService.getGroupsByThemeId(this.record.vbsThemeId)),
        tap((res) => (this.vbsThemeGroups = this.buildOfferingWinnerDropdown(res.body))),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        if (this.record.status === AttendanceStatus.CLOSED) {
          this.popupService.error('VBS Attendance Record is Closed. Cannot update Information!');
          this.navigationService.navigate(`/vbs/themes/${this.record.vbsThemeId}/attendance/${this.record.id}`);
        }

        this.buildForm();
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.record ? this.record.name : '', Validators.required],
      spiritTheme: [this.record?.spiritTheme ? this.record.spiritTheme : ''],
      offeringAmount: [this.record ? this.record.money : '0.00', Validators.required],
      offeringWinners: [this.record ? this.record.offeringWinners : []],
      points: [this.record ? this.record.offeringWinnerPoints : null],
      activeDate: [
        this.record ? this.record.activeDate : this.commonService.formatDate(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
    });
  }

  onBackClick() {
    this.navigationService.back(`${this.baseRoute}/attendance/${this.record.id}`);
  }

  onUpdateClick() {
    this.loading = true;

    const newRecord: VBSAttendanceRecord = {
      name: this.form.value.name.trim(),
      spiritTheme: this.form.value.spiritTheme,
      activeDate: this.form.value.activeDate,
      money: this.form.value.offeringAmount,
    };

    if (this.form.value.offeringWinners && this.form.value.offeringWinners.length > 0) {
      newRecord.offeringWinners = this.form.value.offeringWinners;
    }

    if (this.form.value.points) {
      newRecord.offeringWinnerPoints = this.form.value.points;
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

  buildOfferingWinnerDropdown(groups: VBSThemeGroup[]) {
    return groups.map((w) => {
      return { value: w.group, name: this.getFormattedGroupName(w) };
    });
  }

  buildBaseRoute(path: string) {
    if (path && path.includes('themes')) {
      return `/vbs/themes/${this.record.vbsThemeId}`;
    } else {
      return path;
    }
  }
}
