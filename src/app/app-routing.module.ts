import { LinkComponent } from './link/link.component';
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
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/notAuth.guard';
import { ModifyScheduleComponent } from './modify-schedule/modify-schedule.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {animation: 'Home'}, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'calendar', component: CalendarComponent, data: {animation: 'Calendar'}, canActivate: [AuthGuard]},
  {path: 'schedule', component: ScheduleComponent, data: {animation: 'Schedule'}, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, data: {animation: 'Settings'}, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard],
    children: [
      {path: '', component: CredentialsComponent},
      {path: 'subjects', component: SubjectsComponent},    
      {path: 'schedule-input', component: ScheduleInputComponent}      
    ]
  },
  {path: "grades", loadChildren: './report-c/report-card.module#ReportCardModule', data:{animation: 'ReportC'}, canActivate: [AuthGuard]},
  {path: 'link', component: LinkComponent, canActivate: [NotAuthGuard] },
  {path: "desktop", loadChildren: './desktop/desktop.module#DesktopModule', canActivate: [AuthGuard]},
  {path: "groups", loadChildren: './groups/groups.module#GroupsModule', canActivate: [AuthGuard]},
  {path: "modify-schedule", loadChildren: './modify-schedule/modify-schedule.module#ModifyScheduleModule'}, //what netlify
  {path: '**', redirectTo: 'not-found'} // This sould be exported to separate Module
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}