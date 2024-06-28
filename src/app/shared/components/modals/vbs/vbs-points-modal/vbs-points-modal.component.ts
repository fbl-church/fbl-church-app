import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createUniqueValidator } from 'projects/insite-kit/src/component/form/service/async.validator';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSPoint, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';
import { VBSDeletePointsModalComponent } from '../vbs-delete-points-modal/vbs-delete-points-modal.component';

@Component({
  selector: 'app-vbs-points-modal',
  templateUrl: './vbs-points-modal.component.html',
})
export class VBSPointsModalComponent implements OnInit {
  @ViewChild('vbsThemePointsModal') modal: ModalComponent;
  @ViewChild(VBSDeletePointsModalComponent) deleteModal: VBSDeletePointsModalComponent;
  @Input() theme: VBSTheme;
  @Output() pointsUpdated = new EventEmitter<void>();

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  currentVBSPoint: VBSPoint;

  constructor(
    private readonly vbsPointService: VBSPointsService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  open(p: VBSPoint) {
    this.currentVBSPoint = p;
    this.form.reset();
    this.form.patchValue({ name: p.displayName, points: p.points, registrationOnly: !!p.registrationOnly || false });
    this.modal.open();
  }

  onDeleteClick() {
    this.modal.close();
    this.deleteModal.open(this.currentVBSPoint.id);
  }

  onUpdateClick() {
    this.modalLoading = true;

    this.vbsPointService.update(this.currentVBSPoint.id, this.buildVBSPointData()).subscribe({
      next: () => {
        this.popupService.success('Point Value succesfully created!');
        this.modalLoading = false;
        this.modal.close();
        this.pointsUpdated.emit();
      },

      error: () => {
        this.popupService.error('Unable to create Point Value at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }

  buildVBSPointData() {
    return {
      displayName: this.form.value.name.trim(),
      points: this.form.value.points,
      registrationOnly: this.form.value.registrationOnly,
    };
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: createUniqueValidator('duplicate', (value) =>
            this.vbsPointService.doesPointNameExistForThemeId(this.theme.id, value)
          ),
        },
      ],
      points: [null, Validators.required],
      registrationOnly: [false, Validators.required],
    });
  }
}
