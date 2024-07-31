import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays, isBefore, parseISO } from 'date-fns';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { VBSPoint, VBSTheme, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { of } from 'rxjs';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';
@Component({
  selector: 'app-vbs-create-theme',
  templateUrl: './vbs-create-theme.component.html',
})
export class VBSCreateThemeComponent implements OnInit {
  @ViewChild('themeCreatePointsModal') themeCreatePointsModal: ModalComponent;
  @ViewChild('themeEditPointsModal') themeEditPointsModal: ModalComponent;

  form: FormGroup;
  pointsFormGroupArray: FormGroup[] = [];
  loading = false;

  vbsGroups = [ChurchGroup.VBS_PRE_PRIMARY, ChurchGroup.VBS_PRIMARY, ChurchGroup.VBS_MIDDLER, ChurchGroup.VBS_JUNIOR];
  vbsFormGroupsArray: FormGroup[] = [];
  pointsDataloader: any;
  vbsPointsArray: VBSPoint[] = [];
  tempPointIdCounter = 1;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService,
    private readonly vbsThemeService: VBSThemesService
  ) {}

  ngOnInit() {
    this.buildForms();
    this.pointsDataloader = () => of(new HttpResponse({ body: this.vbsPointsArray }));
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

  onPointsSave(event: VBSPoint) {
    const existingPoint = this.vbsPointsArray.find((p) => p.displayName === event.displayName);
    if (existingPoint) {
      existingPoint.points = event.points;
    } else {
      event.id = this.tempPointIdCounter++;
      this.vbsPointsArray.push(event);
    }

    this.pointsDataloader = () => of(new HttpResponse({ body: this.vbsPointsArray }));
    this.themeCreatePointsModal.close();
  }

  onPointsEdit(event: VBSPoint) {
    const existingPoint = this.vbsPointsArray.find((p) => p.id === event.id);
    existingPoint.points = event.points;
    existingPoint.displayName = event.displayName;
    existingPoint.registrationOnly = event.registrationOnly;
    existingPoint.checkInApply = event.checkInApply;

    this.pointsDataloader = () => of(new HttpResponse({ body: this.vbsPointsArray }));
    this.themeEditPointsModal.close();
  }

  onRemovePointGroup(id: any) {
    this.vbsPointsArray = this.vbsPointsArray.filter((p) => p.id !== id);
    this.pointsDataloader = () => of(new HttpResponse({ body: this.vbsPointsArray }));
    this.themeEditPointsModal.close();
  }

  isEndDateBeforeStartDate(start: any, end: any) {
    if (!!start || !!end) {
      return false;
    }

    const parsedStartDate = parseISO(start);
    const parsedEndDate = parseISO(end);
    return isBefore(parsedEndDate, parsedStartDate);
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
    newVBSTheme.points = this.vbsPointsArray;

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
}
