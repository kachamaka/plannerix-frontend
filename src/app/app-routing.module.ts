import { ScheduleInputComponent } from './auth/register/schedule-input/schedule-input.component';
import { SubjectsComponent } from './auth/register/subjects/subjects.component';
import { CredentialsComponent } from './auth/register/credentials/credentials.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ReportCardModule } from './report-c/report-card.module'

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {animation: 'Home'}},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'calendar', component: CalendarComponent, data: {animation: 'Calendar'}},
  {path: 'schedule', component: ScheduleComponent, data: {animation: 'Schedule'}},
  {path: 'settings', component: SettingsComponent, data: {animation: 'Settings'}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent,
    children: [
      {path: '', component: CredentialsComponent},
      {path: 'subjects', component: SubjectsComponent},    
      {path: 'schedule-input', component: ScheduleInputComponent}      
    ]
  },
  {path: "grades", loadChildren: ()=>ReportCardModule, data:{animation: 'ReportC'}},
  {path: '**', redirectTo: 'not-found'} // This sould be exported to separate Module
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
