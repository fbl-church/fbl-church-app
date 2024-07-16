import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Access, App, ChurchGroup, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';

@Component({
  selector: 'app-vbs-groups-children',
  templateUrl: './vbs-groups-children.component.html',
})
export class VBSGroupsChildrenComponent implements OnInit, OnDestroy {
  dataloader: any;
  baseRoute: string;
  activeGroup: ChurchGroup;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();
  loading = true;

  constructor(
    private childrenService: ChildrenService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService
  ) {
    this.dataloader = (params) => this.getVBSChildrenDataloader(params);
  }

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.baseRoute = res.route)),
        tap((res) => (this.activeGroup = res.group)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.dataloader = (params) => this.getVBSChildrenDataloader(params);
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
}
