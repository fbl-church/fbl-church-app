import { Component } from '@angular/core';
import { FileItem } from 'ng2-file-upload';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { concat, concatMap, tap, toArray } from 'rxjs';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-junior-church-lessons',
  templateUrl: './junior-church-lessons.component.html',
})
export class JuniorChurchLessonsComponent {
  progress = 0;
  totalProgress = 1;

  filesUploading = false;

  constructor(
    private readonly storageService: StorageService,
    private readonly popupService: PopupService
  ) {}

  onUploadClick(files: FileItem[]) {
    this.filesUploading = true;
    this.progress = 0;
    this.totalProgress = files.length;

    concat(files.map((f) => f._file))
      .pipe(
        concatMap((f) => this.storageService.upload(f)),
        tap((f) => this.progress++),
        toArray()
      )
      .subscribe({
        next: () => {
          this.popupService.success('Files Successfully uploaded');
          this.filesUploading = false;
        },
        error: () => {
          this.popupService.error('Unable to upload files at this time!');
          this.filesUploading = false;
        },
      });
  }
}
