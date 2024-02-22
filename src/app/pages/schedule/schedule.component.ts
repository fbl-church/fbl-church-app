import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { AttendanceStatus } from 'projects/insite-kit/src/model/attendance-record.model';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { UserSchedule } from 'projects/insite-kit/src/model/user.model';
import { UserScheduleService } from 'src/service/schedule/user-schedule.service';
import { CustomDateFormatter } from './custom-date.formatter';
import { CustomEventTitleFormatter } from './customer-event-title.formatter';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
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
  activeDayIsOpen = false;
  previousLoadedMonth = -1;
  listDataloader: any;
  showCalendar = true;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private readonly scheduleService: UserScheduleService,
    private readonly router: Router
  ) {
    this.listDataloader = (params) => this.scheduleService.getCurrentUserSchedule(params);
  }

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
    this.activeDayIsOpen = false;
    this.reloadCalendarEvents(value.getMonth() + 1);
  }

  onCalendarViewChange(viewType: string) {
    this.showCalendar = viewType === 'calendar';
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
        color: this.getEventStatusColor(s.status),
        meta: { schedule: s, status: s.status, time: formatDate(startDate, 'h:mm a', this.locale) },
      });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventClicked({ event }: { event: CalendarEvent }) {
    if (event.meta.schedule.type === ChurchGroup.NURSERY) {
      this.router.navigate([`/nursery/check-in/${event.meta.schedule.recordId}/details`]);
    } else if (event.meta.schedule.type === ChurchGroup.JUNIOR_CHURCH) {
      this.router.navigate([`/junior-church/check-in/${event.meta.schedule.recordId}/details`]);
    }
  }

  onRowClick(event: UserSchedule) {
    if (event.type === ChurchGroup.NURSERY) {
      this.router.navigate([`/nursery/check-in/${event.recordId}/details`]);
    } else if (event.type === ChurchGroup.JUNIOR_CHURCH) {
      this.router.navigate([`/junior-church/check-in/${event.recordId}/details`]);
    }
  }

  getEventStatusColor(recordStatus: AttendanceStatus): EventColor {
    switch (recordStatus) {
      case AttendanceStatus.ACTIVE:
        return {
          primary: '#3cbe36',
          secondary: '#3cbe36',
        };
      case AttendanceStatus.PENDING:
        return {
          primary: '#feb759',
          secondary: '#feb759',
        };
      case AttendanceStatus.CLOSED:
        return {
          primary: '#e32323',
          secondary: '#e32323',
        };
      default:
        return {
          primary: '#666',
          secondary: '#666',
        };
    }
  }
}
