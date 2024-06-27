import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSPoint, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSPointsService } from 'src/service/vbs/vbs-points.service';

@Component({
  selector: 'app-vbs-create-points-modal',
  templateUrl: './vbs-create-points-modal.component.html',
})
export class VBSCreatePointsModalComponent implements OnInit {
  @ViewChild('vbsThemeCreatePointsModal') modal: ModalComponent;
  @Input() theme: VBSTheme;
  @Output() pointsCreated = new EventEmitter<void>();

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  constructor(
    private readonly vbsPointService: VBSPointsService,
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  open() {
    this.form.reset();
    this.modal.open();
  }

  onSaveClick() {
    this.modalLoading = true;

    this.vbsPointService.create(this.theme.id, [this.buildVBSPointData()]).subscribe({
      next: (res) => {
        this.popupService.success('Point Value succesfully created!');
        this.modalLoading = false;
        this.modal.close();
        this.pointsCreated.emit();
      },

      error: () => {
        this.popupService.error('Unable to create Point Value at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }

  buildVBSPointData(): VBSPoint {
    return {
      displayName: this.form.value.name.trim(),
      points: this.form.value.points,
    };
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      points: [null, Validators.required],
    });
  }
}
