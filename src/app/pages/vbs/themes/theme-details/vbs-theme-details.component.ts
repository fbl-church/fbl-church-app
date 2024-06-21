import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ThemeType } from 'projects/insite-kit/src/model/user.model';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { VBSReportsService } from 'src/service/vbs/vbs-report.service';

@Component({
  selector: 'app-vbs-theme-details',
  templateUrl: './vbs-theme-details.component.html',
  styleUrls: ['./vbs-theme-details.component.scss'],
})
export class VBSThemeDetailsComponent implements OnInit, AfterViewInit {
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
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Worker Group Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        colorByPoint: true,
        data: [
          {
            name: 'Pre-Primary',
            y: 12,
          },
          {
            name: 'Primary',
            y: 8,
          },
          {
            name: 'Middler',
            y: 13,
          },
          {
            name: 'Junior',
            y: 6,
          },
        ],
      },
    ],
  };

  destroy = new Subject<void>();
  loading = true;
  themeData: VBSTheme;
  vbsChildrenStats: any;

  constructor(
    private readonly jwt: JwtService,
    private readonly route: ActivatedRoute,
    private readonly vbsReportsService: VBSReportsService,
    private readonly navigationService: NavigationService
  ) {}

  ngAfterViewInit(): void {
    this.createChart(this.chartEl.nativeElement);
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((res) => res.theme.body),
        tap((res) => (this.themeData = res)),
        takeUntil(this.destroy)
      )
      .subscribe(() => (this.loading = false));

    this.route.params
      .pipe(
        switchMap((res) => this.vbsReportsService.getChildrenStats(res.id)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.vbsChildrenStats = res.body));
  }

  onBackClick() {
    this.navigationService.navigate('/vbs/themes');
  }

  createChart(container, options?: Object) {
    let opts: any = this.defaultOptions;

    if (this.jwt.getTheme() === ThemeType.DARK) {
      opts.chart.backgroundColor = '#222b45';
      opts.title.style = { color: 'white' };
    }

    let e = document.createElement('div');

    container.appendChild(e);

    if (opts.chart) {
      // opts.chart['renderTo'] = e;
    }
    this.highcharts.chart(container, opts);
  }
}
