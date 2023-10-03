import { Component } from '@angular/core';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-junior-church-lessons',
  templateUrl: './junior-church-lessons.component.html',
})
export class JuniorChurchLessonsComponent {
  uploader: any;

  constructor(private readonly storageService: StorageService) {
    this.uploader = (fileItem) => this.storageService.upload(fileItem);
  }
}
