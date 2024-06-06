import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ThemeType } from 'projects/insite-kit/src/model/user.model';
import { JwtService } from 'projects/insite-kit/src/service/auth/jwt.service';

@Component({
  selector: 'app-vbs-stat-cards',
  templateUrl: './vbs-stat-cards.component.html',
  styleUrls: ['./vbs-stat-cards.component.scss'],
})
export class VBSStatCardsComponent implements AfterViewInit {
  @ViewChild('charts') public chartEl: ElementRef;

  highcharts = Highcharts;
  charts = [];
  defaultOptions = {
    credits: {
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

  constructor(private readonly jwt: JwtService) {}

  ngAfterViewInit(): void {
    console.log(this.chartEl);
    this.createChart(this.chartEl.nativeElement);
  }

  createChart(container, options?: Object) {
    let opts: any = this.defaultOptions;

    if (this.jwt.getTheme() === ThemeType.DARK) {
      opts.chart.backgroundColor = '#222b45';
      opts.title.style = { color: 'white' };
    }
    console.log(opts);
    let e = document.createElement('div');

    container.appendChild(e);

    if (opts.chart) {
      // opts.chart['renderTo'] = e;
    }
    this.highcharts.chart(container, opts);
  }
}
