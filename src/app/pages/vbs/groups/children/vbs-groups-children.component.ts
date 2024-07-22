import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType, TranslationKey } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { CommonService } from 'projects/insite-kit/src/service/common/common.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';
import { StorageService } from 'src/service/storage/storage.service';
import { VBSChildPointsService } from 'src/service/vbs/vbs-child-points.service';

@Component({
  selector: 'app-vbs-groups-children',
  templateUrl: './vbs-groups-children.component.html',
})
export class VBSGroupsChildrenComponent implements OnInit, OnDestroy {
  dataloader: any;
  baseRoute: string;
  activeGroup: ChurchGroup;
  themeData: VBSTheme;
  typeTranslation: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();
  loading = true;
  downloadLoading = false;

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly vbsChildPointsService: VBSChildPointsService,
    private readonly popupService: PopupService,
    private readonly storageService: StorageService,
    private readonly commonService: CommonService
  ) {
    this.dataloader = (params) => this.getVBSChildrenDataloader(params);
  }

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.baseRoute = res.route)),
        tap((res) => (this.activeGroup = res.group)),
        tap((res) => (this.themeData = res.theme.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.dataloader = (params) => this.getVBSChildrenDataloader(params);
        this.typeTranslation = this.commonService.translate(this.activeGroup, TranslationKey.CHURCH_GROUP);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.navigate(this.baseRoute);
  }

  getVBSChildrenDataloader(params?: Map<string, string[]>) {
    return this.childrenService.get(params.set('churchGroup', [this.activeGroup]));
  }

  onRowClick(event: Child) {
    this.navigationService.navigate(`${this.baseRoute}/children/${event.id}`);
  }

  onDownloadClick() {
    this.downloadLoading = true;
    this.vbsChildPointsService.downloadChildPointsCards(this.themeData.id, this.activeGroup).subscribe({
      next: (res) => {
        this.popupService.success(`Download Complete for ${this.typeTranslation} Children Points!`);
        this.storageService.download(res, `${this.typeTranslation} Schedule.pdf`);
        this.downloadLoading = false;
      },
      error: (err) => {
        this.popupService.error(`Unable to download ${this.typeTranslation} Children Points. Try again later.`);
        this.downloadLoading = false;
      },
    });
  }
}
