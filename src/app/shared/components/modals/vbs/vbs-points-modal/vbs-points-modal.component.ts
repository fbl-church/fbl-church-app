import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createUniqueValidator } from 'projects/insite-kit/src/component/form/service/async.validator';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSPoint } from 'projects/insite-kit/src/model/vbs.model';
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
  @Input() themeId: number;
  @Input() title = 'Add Point Value?';
  @Input() saveButtonText = 'Save';
  @Input() deleteEnabled = false;
  @Output() pointsUpdated = new EventEmitter<void>();
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
      this.form.patchValue({ name: p.displayName, points: p.points, registrationOnly: !!p.registrationOnly || false });
    } else {
      this.form.patchValue({ registrationOnly: false });
    }

    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onDeleteClick() {
    this.modal.close();
    this.deleteModal.open(this.currentVBSPoint.id);
  }

  onPointValueDeleted() {
    this.pointsUpdated.emit();
  }

  onSaveClick() {
    this.modalLoading = true;
    this.save.emit(this.buildVBSPointData());
  }

  buildVBSPointData(): VBSPoint {
    return {
      id: this.currentVBSPoint?.id,
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
            this.vbsPointService.doesPointNameExistForThemeId(this.themeId, value)
          ),
        },
      ],
      points: [null, Validators.required],
      registrationOnly: [false, Validators.required],
    });
  }
}
