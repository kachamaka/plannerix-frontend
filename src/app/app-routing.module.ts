import { ScheduleInputComponent } from './auth/register/schedule-input/schedule-input.component';
import { SubjectsComponent } from './auth/register/subjects/subjects.component';
import { CredentialsComponent } from './auth/register/credentials/credentials.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { GradesComponent } from './report-c/grades/grades.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReportCComponent } from './report-c/report-c.component';
import { SettingsComponent } from './settings/settings.component';
import { OldGradesComponent } from './report-c/old-grades/old-grades.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {animation: 'Home'}},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'calendar', component: CalendarComponent, data: {animation: 'Calendar'}},
  {path: 'schedule', component: ScheduleComponent, data: {animation: 'Schedule'}},
  {path: 'grades', component: ReportCComponent, data: {animation: 'ReportC'},
    children:[
      {path: '', component: GradesComponent, data: {animation: 'Grades'}},
      {path: 'old-grades', component: OldGradesComponent}
    ]
  },
  {path: 'settings', component: SettingsComponent, data: {animation: 'Settings'}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent,
    children: [
      {path: '', component: CredentialsComponent},
      {path: 'subjects', component: SubjectsComponent},    
      {path: 'schedule-input', component: ScheduleInputComponent}      
    ]
  },
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
