import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validColorValidator } from 'ngx-colors';
import { createUniqueValidator } from 'projects/insite-kit/src/component/form/service/async.validator';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSPointDivision, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { debounceTime } from 'rxjs';
import { VBSPointDivisionService } from 'src/service/vbs/vbs-point-division.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';
import { VBSDeletePointsModalComponent } from '../vbs-delete-points-modal/vbs-delete-points-modal.component';

@Component({
  selector: 'app-vbs-point-division-modal',
  templateUrl: './vbs-point-division-modal.component.html',
})
export class VBSPointDivisionModalComponent implements OnInit {
  @ViewChild('vbsPointDivisionModal') modal: ModalComponent;
  @ViewChild(VBSDeletePointsModalComponent) deleteModal: VBSDeletePointsModalComponent;
  @Input() name: string;
  @Input() theme: VBSTheme;
  @Input() title = 'Add Point Division?';
  @Input() saveButtonText = 'Save';
  @Input() deleteEnabled = false;
  @Output() deleted = new EventEmitter<VBSPointDivision>();
  @Output() save = new EventEmitter<VBSPointDivision>();

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  currentVBSPointDivision: VBSPointDivision;
  currentSelectedColor: any;
  rangeValidatorMin: AsyncValidatorFn;
  rangeValidatorMax: AsyncValidatorFn;

  constructor(
    private readonly vbsPointService: VBSPointsService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly vbsPointDivisionService: VBSPointDivisionService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.rangeValidatorMin = createUniqueValidator('duplicate', (value) =>
      this.vbsPointDivisionService.isRangeValueWithinExistingRangeForThemeId(this.theme.id, value)
    );
    this.rangeValidatorMax = createUniqueValidator('duplicate', (value) =>
      this.vbsPointDivisionService.isRangeValueWithinExistingRangeForThemeId(this.theme.id, value)
    );
  }

  open(pd?: VBSPointDivision) {
    this.modalLoading = false;
    this.form.reset();

    this.currentVBSPointDivision = pd;
    if (pd) {
      this.currentVBSPointDivision = pd;
      this.form.patchValue({
        minRange: pd.min,
        maxRange: pd.max,
        pickerInput: pd.color,
        pickerColor: pd.color,
      });
    }

    if (this.theme && !this.form.controls.minRange.hasAsyncValidator(this.rangeValidatorMin)) {
      this.form.controls.minRange.addAsyncValidators(this.rangeValidatorMin);
      this.form.controls.minRange.updateValueAndValidity();
    }

    if (this.theme && !this.form.controls.maxRange.hasAsyncValidator(this.rangeValidatorMax)) {
      this.form.controls.maxRange.addAsyncValidators(this.rangeValidatorMax);
      this.form.controls.maxRange.updateValueAndValidity();
    }

    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onDeleteClick() {
    this.modalLoading = true;
    this.modalLoading = true;

    this.vbsPointDivisionService.delete(this.currentVBSPointDivision.id).subscribe({
      next: () => {
        this.popupService.success('Point Division Successfully Deleted!');
        this.modalLoading = false;
        this.modal.close();
        this.deleted.emit(this.currentVBSPointDivision);
      },

      error: () => {
        this.popupService.error('Unable to delete point division at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }

  onSaveClick() {
    this.modalLoading = true;
    this.save.emit(this.buildVBSPointDivisionData());
  }

  buildVBSPointDivisionData(): VBSPointDivision {
    return {
      id: this.currentVBSPointDivision?.id,
      min: this.form.value.minRange,
      max: this.form.value.maxRange,
      color: this.form.value.pickerColor,
    };
  }

  buildForm() {
    this.form = this.fb.group({
      minRange: [null, Validators.required],
      maxRange: [null, Validators.required],
      pickerColor: [null],
      pickerInput: [null, [Validators.required, validColorValidator()]],
    });

    this.form.controls.pickerColor.valueChanges.subscribe((color) => {
      this.currentSelectedColor = color;
      this.form.controls.pickerInput.setValue(color, {
        emitEvent: false,
      });
    });

    this.form.controls.pickerInput.valueChanges.pipe(debounceTime(300)).subscribe((color) => {
      this.currentSelectedColor = color;
      this.form.controls.pickerColor.setValue(color, {
        emitEvent: false,
      });
    });
  }
}
