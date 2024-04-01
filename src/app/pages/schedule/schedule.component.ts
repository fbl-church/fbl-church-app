import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { ChurchGroup } from 'projects/insite-kit/src/model/common.model';
import { UserSchedule } from 'projects/insite-kit/src/model/user.model';
import { NavigationService } from 'projects/insite-kit/src/service/navigation/navigation.service';
import { UserScheduleService } from 'src/service/schedule/user-schedule.service';
import { CALENDAR_COLOR } from './calendar-event.colors';
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
  events: CalendarEvent[] = [];

  loading = true;
  activeDayIsOpen = false;
  previousLoadedMonth = -1;
  showCalendar = true;

  listDataloader: any;

  constructor(
    private readonly scheduleService: UserScheduleService,
    private readonly navigationService: NavigationService
  ) {
    this.listDataloader = (params: Map<string, string[]>) => this.scheduleService.getCurrentUserSchedule(params);
  }

  ngOnInit() {
    document.body.classList.add('dark');
    this.reloadCalendarEvents(new Date().getMonth() + 1);
  }

  onViewDateChange(value: Date) {
    this.viewDate = value;
    this.activeDayIsOpen = false;
    this.reloadCalendarEvents(value.getMonth() + 1);
  }

  onToggleCalendarView() {
    this.showCalendar = !this.showCalendar;
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
      startDate.setHours(s.recordName === 'Nursery (SS)' ? 9 : 10, 0, 0, 0);

      this.events.push({
        start: startDate,
        title: s.recordName,
        color: CALENDAR_COLOR[s.status],
        meta: { schedule: s },
      });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
      this.viewDate = date;
    }
  }

  routeToEvent(group: ChurchGroup, recordId: number) {
    if (group === ChurchGroup.NURSERY) {
      this.navigationService.navigate(`/nursery/check-in/${recordId}/details`);
    } else if (group === ChurchGroup.JUNIOR_CHURCH) {
      this.navigationService.navigate(`/junior-church/check-in/${recordId}/details`);
    }
  }
}
