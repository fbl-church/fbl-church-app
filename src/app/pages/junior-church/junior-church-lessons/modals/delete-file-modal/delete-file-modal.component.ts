import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { FTPFile } from 'projects/insite-kit/src/component/upload/file-uploader.model';
import {
  Access,
  App,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-delete-file-modal',
  templateUrl: './delete-file-modal.component.html',
})
export class DeleteFileModalComponent {
  @ViewChild('deleteFileModal') modal: ModalComponent;
  @Input() basePath = '';
  @Output() fileDeleted = new EventEmitter<void>();

  modalLoading = false;
  selectedFile: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly storageService: StorageService,
    private readonly popupService: PopupService
  ) {}

  open(f: FTPFile) {
    this.modalLoading = false;
    this.selectedFile = f;
    this.modal.open();
  }

  onFileDelete() {
    this.modalLoading = true;
    this.storageService
      .delete(`${this.basePath}/${this.selectedFile.name}`)
      .subscribe({
        next: () => {
          this.modal.close();
          this.popupService.success(
            `'${this.selectedFile.name}' Successfully Deleted`
          );
          this.fileDeleted.emit();
        },
        error: () => {
          this.modal.close();
          this.popupService.error(
            'Unable to delete file at this time. Try again later.'
          );
        },
      });
  }
}
