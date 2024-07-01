import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { User } from 'projects/insite-kit/src/model/user.model';
import { VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-groups-modal',
  templateUrl: './vbs-groups-modal.component.html',
})
export class VBSGroupsModalComponent implements OnInit {
  @ViewChild('vbsThemeGroupsModal') modal: ModalComponent;
  @Input() themeId: number;
  @Output() groupUpdated = new EventEmitter<void>();

  modalLoading = false;
  currentUser: User = null;
  form: FormGroup;

  currentVBSThemeGroup: VBSThemeGroup;

  constructor(
    private readonly vbsThemeService: VBSThemesService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  open(p?: VBSThemeGroup) {
    this.modalLoading = false;
    this.form.reset();

    this.currentVBSThemeGroup = p;
    this.form.patchValue({
      group: this.commonService.translate(p.group, TranslationKey.CHURCH_GROUP),
      name: p.name,
    });

    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onSaveClick() {
    this.modalLoading = true;
    this.vbsThemeService.updateGroupByThemeId(this.themeId, this.buildVBSThemGroupData()).subscribe({
      next: () => {
        this.popupService.success('VBS Theme Group succesfully updated!');
        this.modalLoading = false;
        this.modal.close();
        this.groupUpdated.emit();
      },

      error: () => {
        this.popupService.error('Unable to update VBS Theme Group at this time. Try again later.');
        this.modalLoading = false;
        this.modal.close();
      },
    });
  }

  buildVBSThemGroupData(): VBSThemeGroup {
    return {
      group: this.currentVBSThemeGroup?.group,
      name: this.form.value.name.trim(),
    };
  }

  buildForm() {
    this.form = this.fb.group({
      group: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
}
