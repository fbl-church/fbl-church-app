import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { VBSAttendanceRecord, VBSTheme, VBSThemeGroup } from 'projects/insite-kit/src/model/vbs.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { ChildrenService } from 'src/service/children/children.service';
import { UserService } from 'src/service/users/user.service';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-group-details',
  templateUrl: './vbs-group-details.component.html',
})
export class VBSGroupDetailsComponent implements OnInit, OnDestroy {
  themeData: VBSTheme;
  activeGroup: ChurchGroup;
  activeRoute: string;
  vbsThemeGroup: VBSThemeGroup;

  destroy = new Subject<void>();
  loading = true;

  vbsGroupWorkersDataloader: any;
  vbsGroupChildrenDataloader: any;
  vbsAttendanceDataloader: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vbsThemeService: VBSThemesService,
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly userService: UserService,
    private readonly childrenService: ChildrenService,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.activeGroup = res.group)),
        tap((res) => (this.activeRoute = res.route)),
        map((res) => res.theme.body),
        tap((res) => (this.themeData = res)),
        switchMap(() => this.vbsAttendanceService.getByThemeId(this.themeData.id)),
        tap((res) => (this.vbsAttendanceDataloader = () => of(res))),
        switchMap(() => this.vbsThemeService.getGroupsByThemeId(this.themeData.id)),
        tap((res) => (this.vbsThemeGroup = res.body.find((g) => g.group === this.activeGroup))),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));

    this.route.data.pipe(takeUntil(this.destroy)).subscribe((res) => {
      this.vbsGroupWorkersDataloader = (params: any) => this.getVBSGroupWorkers(res.group, params);
      this.vbsGroupChildrenDataloader = (params: any) => this.getVBSGroupChildren(res.group, params);
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onAttendanceRecordRowClick(event: VBSAttendanceRecord) {
    this.navigationService.navigate(`${this.activeRoute}/attendance/${event.id}`);
  }

  getVBSGroupWorkers(group: ChurchGroup, params?: Map<string, string[]>) {
    return this.userService.getUsers(params.set('webRole', [group]));
  }

  getVBSGroupChildren(group: ChurchGroup, params?: Map<string, string[]>) {
    return this.childrenService.get(params.set('churchGroup', [group]));
  }
}
