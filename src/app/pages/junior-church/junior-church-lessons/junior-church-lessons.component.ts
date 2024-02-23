import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'projects/insite-kit/src/component/grid/grid.component';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
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

  constructor(private readonly storageService: StorageService, private readonly navigationService: NavigationService) {
    this.fileDataloader = (params) => this.storageService.get(params.set('path', [this.readPath]));
  }

  onUploadClick() {
    this.navigationService.navigate('/junior-church/lessons/upload');
  }

  refreshGrid() {
    this.grid.refresh();
  }
}
