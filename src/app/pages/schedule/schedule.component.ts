import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { UserSchedule } from 'projects/insite-kit/src/model/user.model';
import { UserScheduleService } from 'src/service/schedule/user-schedule.service';
import { CustomDateFormatter } from './custom-date.formatter';
import { CustomEventTitleFormatter } from './customer-event-title.formatter';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class ScheduleComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];
  canEdit = false;
  loading = true;
  previousLoadedMonth = -1;
  excludeDays: number[] = [1, 2, 3, 4, 5, 6];
  JSON = JSON;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private readonly scheduleService: UserScheduleService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.reloadCalendarEvents(new Date().getMonth() + 1);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  onViewChange(value: CalendarView) {
    this.view = value;
  }

  onViewDateChange(value: Date) {
    this.viewDate = value;
    this.reloadCalendarEvents(value.getMonth() + 1);
  }

  reloadCalendarEvents(month: number) {
    if (this.previousLoadedMonth !== month) {
      this.loading = true;
      this.events = [];
      this.previousLoadedMonth = month;

      this.scheduleService.getCurrentUserSchedule(new Map().set('months', [month])).subscribe((res) => {
        this.mapUserSchedule(res.body);
        this.loading = false;
      });
    }
  }

  mapUserSchedule(schedule: UserSchedule[]) {
    schedule.forEach((s) => {
      const dateString = s.activeDate
        .toString()
        .split('-')
        .map((v) => Number(v));
      const startDate = startOfDay(new Date(dateString[0], dateString[1] - 1, dateString[2]));
      s.recordName === 'Nursery (SS)' ? startDate.setHours(9, 0, 0, 0) : startDate.setHours(10, 0, 0, 0);

      this.events.push({
        start: startDate,
        title: s.recordName,
        meta: { schedule: s, status: s.status, time: formatDate(startDate, 'h:mm a', this.locale) },
      });
    });
  }

  eventClicked(event: any) {
    if (event.meta.schedule.type === ChurchGroup.NURSERY) {
      this.router.navigate([`/nursery/check-in/${event.meta.schedule.recordId}/details`]);
    } else if (event.meta.schedule.type === ChurchGroup.JUNIOR_CHURCH) {
      this.router.navigate([`/junior-church/check-in/${event.meta.schedule.recordId}/details`]);
    }
  }
}
