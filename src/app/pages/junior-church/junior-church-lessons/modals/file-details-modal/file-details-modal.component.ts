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
import { StorageService } from 'src/service/storage/storage.service';
import { DeleteFileModalComponent } from '../delete-file-modal/delete-file-modal.component';

@Component({
  selector: 'app-file-details-modal',
  templateUrl: './file-details-modal.component.html',
})
export class FileDetailsModalComponent {
  @ViewChild(DeleteFileModalComponent)
  deleteFileModal: DeleteFileModalComponent;
  @ViewChild('fileDetailsModal') modal: ModalComponent;
  @Input() basePath = '';
  @Output() fileDeleted = new EventEmitter<void>();

  modalDownloadLoading = false;
  selectedFile: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(private readonly storageService: StorageService) {}

  open(f: FTPFile) {
    this.modalDownloadLoading = false;
    this.selectedFile = f;
    this.modal.open();
  }

  onFileDownloadClick(file: FTPFile) {
    this.modalDownloadLoading = false;
    this.selectedFile = file;
    this.modal.open();
  }

  onFileDeleteClick() {
    this.modal.close();
    this.deleteFileModal.open(this.selectedFile);
  }

  onFileDeleted() {
    this.fileDeleted.emit();
  }

  onFileDownload() {
    this.modalDownloadLoading = true;
    this.storageService
      .getBlob(`${this.basePath}/${this.selectedFile.name}`)
      .subscribe((res) => {
        this.storageService.download(res, this.selectedFile.name);
        this.modalDownloadLoading = false;
      });
  }
}
