import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-theme-details-modal',
  templateUrl: './vbs-theme-details-modal.component.html',
})
export class VBSThemeDetailsModalComponent implements OnInit {
  @ViewChild('vbsThemeDetailsModal') modal: ModalComponent;
  @Input() theme: VBSTheme;
  @Output() themeUpdated = new EventEmitter<VBSTheme>();

  modalLoading = false;
  form: FormGroup;

  constructor(
    private readonly vbsThemeService: VBSThemesService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  open() {
    this.modalLoading = false;
    this.form.reset();

    this.form.patchValue({
      name: this.theme.name,
      donation: this.theme.donation,
    });

    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onSaveClick() {
    this.modalLoading = true;
    this.vbsThemeService.update(this.theme.id, this.buildVBSThemeData()).subscribe({
      next: (res) => {
        this.popupService.success('VBS Theme succesfully updated!');
        this.modalLoading = false;
        this.modal.close();
        this.themeUpdated.emit(res);
      },

      error: () => {
        this.popupService.error('Unable to update VBS Theme at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }

  buildVBSThemeData(): VBSTheme {
    return {
      name: this.form.value.name.trim(),
      donation: this.form.value.donation.trim(),
    };
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      donation: ['', Validators.required],
    });
  }
}
