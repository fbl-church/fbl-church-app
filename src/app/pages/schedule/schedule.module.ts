import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BaseInitModule } from 'src/app/common/base-init.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [CalendarHeaderComponent, ScheduleComponent],
  imports: [
    BaseInitModule,
    SharedModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class ScheduleModule {}
