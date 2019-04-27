import { CalendarComponent } from './../calendar/calendar.component';
import { ScheduleComponent } from './../schedule/schedule.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import {DesktopComponent} from './desktop.component';
import { RecentGradesComponent } from '../report-c/recent-grades/recent-grades.component';
import { YearGradesComponent } from '../report-c/year-grades/year-grades.component';
import { AllGradesComponent } from '../report-c/all-grades/all-grades.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [

    {path:"", component: DesktopComponent,children:[
        // {path: 'home', component: HomeComponent},
        // {path: '', redirectTo: 'home'},
        // {path: 'schedule', component: ScheduleComponent},
        {path: 'calendar', component: CalendarComponent},
        // {path: 'settings', component: SettingsComponent},
        // {path: '', pathMatch: 'full', redirectTo: 'recent-grades'},
        // {path: 'year-grades', component: YearGradesComponent},
        // {path: 'all-grades', component: AllGradesComponent},
    ]}
]

@NgModule({
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DesktopRoutingModule {}