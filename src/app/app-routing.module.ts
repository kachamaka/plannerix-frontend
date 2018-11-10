import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReportCComponent } from './report-c/report-c.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "calendar", component: CalendarComponent},
  {path: "schedule", component: ScheduleComponent},
  {path: "my-grades", component: ReportCComponent},
  {path: "settings", component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
