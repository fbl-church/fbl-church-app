import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createUniqueValidator } from 'projects/insite-kit/src/component/form/service/async.validator';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSPoint, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';
import { VBSDeletePointsModalComponent } from '../vbs-delete-points-modal/vbs-delete-points-modal.component';

@Component({
  selector: 'app-vbs-points-modal',
  templateUrl: './vbs-points-modal.component.html',
})
export class VBSPointsModalComponent implements OnInit {
  @ViewChild('vbsThemePointsModal') modal: ModalComponent;
  @ViewChild(VBSDeletePointsModalComponent) deleteModal: VBSDeletePointsModalComponent;
  @Input() name: string;
  @Input() theme: VBSTheme;
  @Input() title = 'Add Point Value?';
  @Input() saveButtonText = 'Save';
  @Input() deleteEnabled = false;
  @Input() showConfirmDeleteModal = true;
  @Output() pointDeleted = new EventEmitter<VBSPoint>();
  @Output() save = new EventEmitter<VBSPoint>();

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  currentVBSPoint: VBSPoint;

  constructor(private readonly vbsPointService: VBSPointsService, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  open(p?: VBSPoint) {
    this.modalLoading = false;
    this.form.reset();

    this.currentVBSPoint = p;
    if (p) {
      this.currentVBSPoint = p;
      this.form.patchValue({
        name: p.displayName,
        points: p.points,
        registrationOnly: !!p.registrationOnly || false,
        checkInApply: !!p.checkInApply || false,
        enabled: !!p.enabled,
      });

      if (this.theme) {
        this.form.controls.name.addAsyncValidators(
          createUniqueValidator('duplicate', (value) =>
            this.vbsPointService.doesPointNameExistForThemeId(this.theme.id, value)
          )
        );
        this.form.controls.name.updateValueAndValidity();
      }
    } else {
      this.form.patchValue({ registrationOnly: false, checkInApply: false, enabled: true });
    }

    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onDeleteClick() {
    this.modal.close();
    if (this.showConfirmDeleteModal) {
      this.deleteModal.open(this.currentVBSPoint.id);
    } else {
      this.onPointValueDeleted();
    }
  }

  onPointValueDeleted() {
    this.pointDeleted.emit(this.currentVBSPoint);
  }

  onSaveClick() {
    this.modalLoading = true;
    this.save.emit(this.buildVBSPointData());
  }

  buildVBSPointData(): VBSPoint {
    console.log('TEMP', this.form.value.enabled);
    return {
      id: this.currentVBSPoint?.id,
      displayName: this.form.value.name.trim(),
      points: this.form.value.points,
      registrationOnly: this.form.value.registrationOnly,
      checkInApply: this.form.value.checkInApply,
      enabled: this.form.value.enabled,
    };
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      points: [null, Validators.required],
      registrationOnly: [false, Validators.required],
      checkInApply: [false, Validators.required],
      enabled: [true, Validators.required],
    });
  }
}
