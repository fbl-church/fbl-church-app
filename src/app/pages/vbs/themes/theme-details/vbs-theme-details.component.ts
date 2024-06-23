import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ModalComponent } from 'projects/insite-kit/src/component/modal/modal.component';
import { ThemeType } from 'projects/insite-kit/src/model/user.model';
import { VBSTheme } from 'projects/insite-kit/src/model/vbs.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { PopupService } from 'projects/insite-kit/src/service/notification/popup.service';
import { Subject, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { VBSAttendanceService } from 'src/service/vbs/vbs-attendance.service';
import { VBSReportsService } from 'src/service/vbs/vbs-report.service';
import { VBSThemesService } from 'src/service/vbs/vbs-themes.service';

@Component({
  selector: 'app-vbs-theme-details',
  templateUrl: './vbs-theme-details.component.html',
  styleUrls: ['./vbs-theme-details.component.scss'],
})
export class VBSThemeDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('charts') public chartEl: ElementRef;
  @ViewChild(ModalComponent) deleteModal: ModalComponent;

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
      text: 'Worker Distribution',
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
  deleteModalLoading = false;
  themeData: VBSTheme;
  vbsChildrenStats: any;
  vbsAttendanceDataloader: any;
  vbsThemeId: any;

  constructor(
    private readonly jwt: JwtService,
    private readonly route: ActivatedRoute,
    private readonly vbsReportsService: VBSReportsService,
    private readonly navigationService: NavigationService,
    private readonly vbsAttendanceService: VBSAttendanceService,
    private readonly vbsThemeService: VBSThemesService,
    private readonly popupService: PopupService
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
        tap((res) => (this.vbsThemeId = res.id)),
        switchMap(() => this.vbsReportsService.getChildrenStats(this.vbsThemeId)),
        tap((res) => (this.vbsChildrenStats = res.body)),
        switchMap(() => this.vbsAttendanceService.getByThemeId(this.vbsThemeId)),
        takeUntil(this.destroy)
      )
      .subscribe((res) => (this.vbsAttendanceDataloader = () => of(res)));
  }

  onBackClick() {
    this.navigationService.navigate('/vbs/themes');
  }

  onDeleteTheme() {
    this.deleteModalLoading = true;
    this.vbsThemeService.delete(this.vbsThemeId).subscribe({
      next: (res) => {
        this.deleteModal.close();
        this.popupService.success('VBS Theme Successfully Deleted!');
        this.navigationService.navigate('/vbs/themes');
      },
      error: () => {
        this.deleteModal.close();
        this.popupService.error('Unable to delete VBS Theme. Try again later.');

        this.deleteModalLoading = false;
      },
    });
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
