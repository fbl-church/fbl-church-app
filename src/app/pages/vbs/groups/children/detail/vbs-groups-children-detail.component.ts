import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Access, App, FeatureType } from 'projects/insite-kit/src/model/common.model';
import { Child, ThemeType } from 'projects/insite-kit/src/model/user.model';
import { VBSChildAttendance, VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChildAttendanceRecordsGridComponent } from 'src/app/shared/components/grids/attendance/child-attendance-records-grid/child-attendance-records-grid.component';
import { VBSChildAttendanceService } from 'src/service/vbs/vbs-child-attendance.service';

@Component({
  selector: 'app-vbs-groups-children-detail',
  templateUrl: './vbs-groups-children-detail.component.html',
})
export class VBSGroupsChildrenDetailComponent implements OnInit, OnDestroy {
  @ViewChild('charts') public chartEl: ElementRef;
  @ViewChild(ChildAttendanceRecordsGridComponent) recordsGrid: ChildAttendanceRecordsGridComponent;

  highcharts = Highcharts;
  charts = [];
  defaultOptions = {
    lang: {
      thousandsSep: ',',
    },
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
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
          style: {
            textOutline: 'none',
            fontSize: '12px',
          },
        },
      },
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          fontSize: 20,
        },
        borderWidth: 2,
        borderColor: 'white',
        showInLegend: true,
        point: {
          events: {
            legendItemClick: (series: any) => this.lengendClick(series),
          },
        },
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
  pointChart: Highcharts.Chart;

  allPointsMap: Map<string, number>;
  chartTitlePointsMap: Map<string, number>;

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
    this.allPointsMap = new Map<string, number>();
    let totalPoints = 0;

    for (const att of childAttendance) {
      att.points.forEach((p) => {
        if (this.allPointsMap.has(p.displayName)) {
          this.allPointsMap.set(p.displayName, this.allPointsMap.get(p.displayName) + p.points);
        } else {
          this.allPointsMap.set(p.displayName, p.points);
        }
        totalPoints += p.points;
      });
    }
    this.chartTitlePointsMap = this.allPointsMap;
    this.createChart(this.chartEl.nativeElement, totalPoints);
  }

  createChart(container, totalPoints: number = 0) {
    let opts: any = {
      title: this.getTitleData(totalPoints),
      series: [this.getSeriesData(this.allPointsMap)],
      ...this.defaultOptions,
    };

    this.checkUserTheme(opts);

    container.appendChild(document.createElement('div'));
    this.pointChart = this.highcharts.chart(container, opts);
    this.highcharts.setOptions({ lang: { thousandsSep: ',' } });

    this.chartLoading = false;
  }

  getTitleData(totalPoints: number): Highcharts.TitleOptions {
    return {
      text: `${Number(totalPoints).toLocaleString('en-US')} points`,
      verticalAlign: 'middle',
      align: 'center',
      y: -10,
    };
  }

  getSeriesData(series?: Map<string, number>): any {
    return {
      type: 'pie',
      innerSize: '75%',
      data: [...Array.from(series, ([key, value]) => ({ name: key, y: value }))],
    };
  }

  checkUserTheme(options: any) {
    if (this.jwt.getTheme() === ThemeType.DARK) {
      options.title.style = { color: 'white', borderColor: 'white', fontSize: '24px' };
      options.plotOptions.series.dataLabels.style = { color: 'white', fontSize: '12px' };
      options.plotOptions.pie.borderColor = '#222B45';
      options.legend.itemStyle = { color: 'white' };
    }
  }

  onUpdateChart() {
    this.chartLoading = true;
    this.pointChart.destroy();
    this.recordsGrid.grid.refresh();
  }

  lengendClick(series: any) {
    if (this.chartTitlePointsMap.has(series.target.name)) {
      this.chartTitlePointsMap.delete(series.target.name);
    } else {
      this.chartTitlePointsMap.set(series.target.name, series.target.y);
    }

    this.pointChart.setTitle(this.getTitleData(this.calculateTitlePoints()));
  }

  calculateTitlePoints() {
    return Array.from(this.chartTitlePointsMap, ([key, value]) => ({ name: key, y: value })).reduce(
      (acc, val) => acc + val.y,
      0
    );
  }
}
