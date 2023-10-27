import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-lessons-upload',
  templateUrl: './lessons-upload.component.html',
})
export class LessonsUploadComponent {
  readonly uploadPath = `${ChurchGroup.JUNIOR_CHURCH}/lessons`;
  uploader: any;

  constructor(private readonly storageService: StorageService, private readonly router: Router) {
    this.uploader = (fileItem) => this.storageService.upload(fileItem, this.uploadPath);
  }

  onBackClick() {
    this.router.navigate(['/junior-church/lessons']);
  }
}
