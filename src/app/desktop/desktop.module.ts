import { NavigationDesktopModule } from './../navigation-desktop/navigation-desktop.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop-routing.module';
import { SettingsModule } from '../settings/settings.module';
import { ReportCardModule } from '../report-c/report-card.module';
import { HomeModule } from '../home/home.module';
import { CalendarModule } from '../calendar/calendar.module';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DesktopComponent
  ],
  imports: [
    CommonModule,
    DesktopRoutingModule,
    SettingsModule,
    ReportCardModule,
    HomeModule,
    CalendarModule,
    ScheduleModule,
    NavigationDesktopModule
  ]
})
export class DesktopModule { }
