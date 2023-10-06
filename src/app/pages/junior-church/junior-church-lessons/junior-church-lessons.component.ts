import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import {
  Access,
  App,
  ChurchGroup,
  FeatureType,
} from 'projects/insite-kit/src/model/common.model';
import { StorageService } from 'src/service/storage/storage.service';

@Component({
  selector: 'app-junior-church-lessons',
  templateUrl: './junior-church-lessons.component.html',
})
export class JuniorChurchLessonsComponent {
  @ViewChild(GridComponent) grid: GridComponent;

  readonly readPath = `${ChurchGroup.JUNIOR_CHURCH}/lessons`;
  fileDataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {
    this.fileDataloader = (params) =>
      this.storageService.get(params.set('path', [this.readPath]));
  }

  onUploadClick() {
    this.router.navigate(['/junior-church/lessons/upload']);
  }

  refreshGrid() {
    this.grid.refresh();
  }
}
