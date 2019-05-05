import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportCComponent } from './report-c.component';
import { RecentGradesComponent } from './recent-grades/recent-grades.component';
import { YearGradesComponent } from './year-grades/year-grades.component';
import { AllGradesComponent } from './all-grades/all-grades.component';


const routes: Routes = [
    { path: '', component: ReportCComponent , children:[
        {path: 'year-grades', component: YearGradesComponent},
        {path: 'all-grades', component: AllGradesComponent},
        {path: 'recent-grades', component: RecentGradesComponent},
        {path: '', pathMatch: 'full', redirectTo: 'recent-grades'}
    ]}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportCardRoutingModule{}
