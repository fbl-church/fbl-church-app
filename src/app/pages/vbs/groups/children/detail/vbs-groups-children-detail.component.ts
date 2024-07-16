import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child, ThemeType } from 'projects/insite-kit/src/model/user.model';
import { VBSChildAttendance, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';

@Component({
  selector: 'app-vbs-groups-children-detail',
  templateUrl: './vbs-groups-children-detail.component.html',
})
export class VBSGroupsChildrenDetailComponent implements OnInit, OnDestroy {
  @ViewChild('charts') public chartEl: ElementRef;

  highcharts = Highcharts;
  charts = [];
  defaultOptions = {
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    chart: {
      backgroundColor: 'transparent',
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },

    tooltip: {
      pointFormat: 'Points: <b>{point.y}</b>',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          style: {
            textOutline: 'none',
          },
        },
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          fontSize: 20,
        },
        borderWidth: 2,
      },
    },
  };

  childData: Child;
  latestTheme: VBSTheme;
  baseRoute: string;
  childAttendanceDataloader: any;

  FeatureType = FeatureType;
  Application = App;
  Access = Access;

  destroy = new Subject<void>();
  loading = true;
  chartLoading = true;

  constructor(
    private readonly jwt: JwtService,
    private readonly route: ActivatedRoute,
    private readonly vbsChildAttendanceService: VBSChildAttendanceService,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        tap((res) => (this.baseRoute = res.route)),
        tap((res) => (this.childData = res.child.body)),
        tap((res) => (this.latestTheme = res.theme.body)),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.childAttendanceDataloader = (params) =>
          this.vbsChildAttendanceService
            .getVBSChildAttendance(this.childData.id, this.latestTheme.id, params)
            .pipe(tap((res) => this.calculateTotalPoints(res.body)));
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onBackClick() {
    this.navigationService.navigate(`${this.baseRoute}/children`);
  }

  calculateTotalPoints(childAttendance: VBSChildAttendance[]) {
    const childPointMap = new Map<string, number>();
    let totalPoints = 0;

    for (const att of childAttendance) {
      att.points.forEach((p) => {
        if (childPointMap.has(p.displayName)) {
          childPointMap.set(p.displayName, childPointMap.get(p.displayName) + p.points);
        } else {
          childPointMap.set(p.displayName, p.points);
        }
        totalPoints += p.points;
      });
    }

    this.createChart(this.chartEl.nativeElement, childPointMap, totalPoints);
  }

  createChart(container, series?: Map<string, number>, totalPoints: number = 0) {
    let opts: any = this.defaultOptions;
    opts.title = {
      text: `${Number(totalPoints).toLocaleString('en-US')} points`,
      verticalAlign: 'middle',
      margin: 500,
      y: 10,
    };
    opts.series = [
      {
        type: 'pie',
        innerSize: '75%',
        colorByPoint: true,
        data: [...Array.from(series, ([key, value]) => ({ name: key, y: value }))],
      },
    ];

    if (this.jwt.getTheme() === ThemeType.DARK) {
      opts.title.style = { color: 'white', borderColor: 'white', fontSize: '24px' };
      opts.plotOptions.series.dataLabels.style = { color: 'white', fontSize: '18px' };
    }

    container.appendChild(document.createElement('div'));
    this.highcharts.chart(container, opts);
    this.chartLoading = false;
  }
}
