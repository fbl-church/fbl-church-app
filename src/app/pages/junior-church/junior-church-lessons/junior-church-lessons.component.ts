import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import {
  Access,
  App,
  ChurchGroup,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-junior-church-lessons',
  templateUrl: './junior-church-lessons.component.html',
})
export class JuniorChurchLessonsComponent {
  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChild(ModalComponent) deleteFileModal: ModalComponent;

  readonly readPath = `${ChurchGroup.JUNIOR_CHURCH}/lessons`;
  fileDataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  modalLoading = false;
  selectedFileToDelete: any;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly popupService: PopupService
  ) {
    this.fileDataloader = (params) =>
      this.storageService.get(params.set('path', [this.readPath]));
  }

  onUploadClick() {
    this.router.navigate(['/junior-church/lessons/upload']);
  }

  onFileDeleteClick(file: any) {
    this.modalLoading = false;
    this.selectedFileToDelete = file;
    this.deleteFileModal.open();
  }

  onFileDelete() {
    this.modalLoading = true;
    this.storageService
      .delete(`${this.readPath}/${this.selectedFileToDelete.name}`)
      .subscribe({
        next: () => {
          this.deleteFileModal.close();
          this.popupService.success(
            `'${this.selectedFileToDelete.name}' Successfully Deleted`
          );
          this.grid.refresh();
        },
        error: () => {
          this.deleteFileModal.close();
          this.popupService.error(
            'Unable to delete file at this time. Try again later.'
          );
        },
      });
  }
}
