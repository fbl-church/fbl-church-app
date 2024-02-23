import { Component } from '@angular/core';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-lessons-upload',
  templateUrl: './lessons-upload.component.html',
})
export class LessonsUploadComponent {
  readonly uploadPath = `${ChurchGroup.JUNIOR_CHURCH}/lessons`;
  uploader: any;

  constructor(private readonly storageService: StorageService, private readonly navigationService: NavigationService) {
    this.uploader = (fileItem) => this.storageService.upload(fileItem, this.uploadPath);
  }

  onBackClick() {
    this.navigationService.back('/junior-church/lessons');
  }
}
