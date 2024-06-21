import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays, isBefore, parseISO } from 'date-fns';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { VBSPoint, VBSTheme, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';
@Component({
  selector: 'app-vbs-create-theme',
  templateUrl: './vbs-create-theme.component.html',
})
export class VBSCreateThemeComponent implements OnInit {
  form: FormGroup;
  pointsFormGroupArray: FormGroup[] = [];
  loading = false;

  vbsGroups = [ChurchGroup.VBS_PRE_PRIMARY, ChurchGroup.VBS_PRIMARY, ChurchGroup.VBS_MIDDLER, ChurchGroup.VBS_JUNIOR];
  vbsFormGroupsArray: FormGroup[] = [];

  constructor(
    private readonly navigationService: NavigationService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService,
    private readonly vbsThemeService: VBSThemesService
  ) {}

  ngOnInit() {
    this.buildForms();
  }

  buildForms() {
    this.form = this.fb.group({
      themeName: ['', Validators.required],
      donation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.form.controls.startDate.valueChanges.subscribe((res) => {
      if (this.isEndDateBeforeStartDate(res, this.form.value.endDate)) {
        this.form.controls.endDate.reset();
        this.popupService.warning('End date must be after the start date.');
      } else {
        this.form.patchValue({ endDate: this.commonService.formatDate(addDays(res, 5), 'yyyy-MM-dd') });
      }
    });

    this.vbsGroups.forEach((v) => {
      const group = this.fb.group({
        vbsGroup: v,
        name: '',
      });
      this.vbsFormGroupsArray.push(group);
    });
    this.vbsFormGroupsArray[0];
  }

  pushNewPointConfig() {
    const newGroup = this.fb.group({
      name: [null, Validators.required],
      points: [null, Validators.required],
    });

    if (this.pointsFormGroupArray) {
      this.pointsFormGroupArray.push(newGroup);
    } else {
      this.pointsFormGroupArray = [newGroup];
    }
  }

  onRemovePointGroup(index: any) {
    this.pointsFormGroupArray.splice(index, 1);
  }

  isEndDateBeforeStartDate(start: any, end: any) {
    if (!!start || !!end) {
      return false;
    }

    const parsedStartDate = parseISO(start);
    const parsedEndDate = parseISO(end);
    return isBefore(parsedEndDate, parsedStartDate);
  }

  isInvalidPointStructure() {
    if (this.pointsFormGroupArray && this.pointsFormGroupArray.length > 0) {
      return !this.pointsFormGroupArray.every((f) => f.valid);
    } else {
      return false;
    }
  }

  onCancelClick() {
    this.navigationService.navigate('/vbs/themes');
  }

  onSaveClick() {
    this.loading = true;

    const newVBSTheme: VBSTheme = {
      name: this.form.value.themeName.trim(),
      donation: this.form.value.donation.trim(),
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
    };
    newVBSTheme.groups = this.mapVBSThemeGroups();
    newVBSTheme.points = this.mapVBSPointStructure();

    this.vbsThemeService.create(newVBSTheme).subscribe({
      next: (res) => {
        this.popupService.success('VBS Theme Successfully Created!');
        this.navigationService.navigate(`/vbs/themes/${res.id}`);
      },
      error: () => {
        this.popupService.error('Unable to create VBS Theme. Try again later.');
        this.loading = false;
      },
    });
  }

  mapVBSThemeGroups() {
    return this.vbsFormGroupsArray.map((fg) => {
      const themedGroup: VBSThemeGroup = {
        group: fg.value.vbsGroup,
        name: fg.value.name.trim(),
      };
      return themedGroup;
    });
  }

  mapVBSPointStructure() {
    return this.pointsFormGroupArray.map((fg) => {
      const point: VBSPoint = {
        displayName: fg.value.name.trim(),
        points: fg.value.points,
      };
      return point;
    });
  }
}
