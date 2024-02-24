import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
})
export class CalendarHeaderComponent {
  @Input() viewDate: Date = new Date();
  @Output() viewDateChange = new EventEmitter<Date>();
  @Output() showListView = new EventEmitter<string>();

  CalendarView = CalendarView;

  onViewDateChange() {
    this.viewDateChange.emit(this.viewDate);
  }

  onCalendarViewChangeClick() {
    this.showListView.emit();
  }
}
