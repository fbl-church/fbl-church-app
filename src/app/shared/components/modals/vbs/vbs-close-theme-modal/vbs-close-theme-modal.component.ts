import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { VBSTheme, VBSThemeStatus } from 'projects/insite-kit/src/model/vbs.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-close-theme-modal',
  templateUrl: './vbs-close-theme-modal.component.html',
})
export class VBSCloseThemeModalComponent {
  @ViewChild('closeThemeModal') modal: ModalComponent;
  @Input() themeId: number;
  @Output() closed = new EventEmitter<VBSTheme>();

  modalLoading = false;

  constructor(private readonly vbsThemeService: VBSThemesService, private readonly popupService: PopupService) {}

  open() {
    this.modal.open();
  }

  onCloseAttendance() {
    this.modalLoading = true;
    this.vbsThemeService.updateThemeStatus(this.themeId, VBSThemeStatus.CLOSED).subscribe({
      next: (res) => {
        this.modal.close();
        this.popupService.success('VBS Theme successfully Closed!');
        this.modalLoading = false;
        this.closed.emit(res);
      },
      error: () => {
        this.modal.close();
        this.popupService.error('Unable to close VBS Theme at this time. Try again later.');
        this.modalLoading = false;
      },
    });
  }
}
