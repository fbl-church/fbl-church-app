import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date.formatter';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class ScheduleComponent {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];
  canEdit = false;
  excludeDays: number[] = [1, 2, 3, 4, 5, 6];

  setView(view: CalendarView) {
    this.view = view;
  }

  onViewChange(value: CalendarView) {
    this.view = value;
  }

  onViewDateChange(value: Date) {
    this.viewDate = value;
  }

  dayClicked(value: any) {
    this.viewDate = value.date;
    this.view = CalendarView.Day;
  }
}
