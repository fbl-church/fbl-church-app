import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView = CalendarView.Month;
  @Input() viewDate: Date = new Date();
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();
  @Output() calendarViewChange = new EventEmitter<string>();

  CalendarView = CalendarView;
  calendarViewEnabled = true;
  currentCalendarView = 'list';

  setView(view: CalendarView) {
    this.view = view;
    this.viewChange.emit(this.view);
  }

  onViewDateChange() {
    this.viewDateChange.emit(this.viewDate);
  }

  onCalendarViewChangeClick() {
    this.calendarViewEnabled = !this.calendarViewEnabled;
    this.currentCalendarView = this.calendarViewEnabled ? 'list' : 'calendar-days';
    this.calendarViewChange.emit(this.calendarViewEnabled ? 'calendar' : 'list');
  }
}
