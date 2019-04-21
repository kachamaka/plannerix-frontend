import { MatButtonModule } from '@angular/material/button';
import { NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { ReportCComponent, BottomSheetOverviewExampleSheet } from "./report-c.component";
import { ReportCardRoutingModule } from "./report-card-routing.module";
import { CommonModule } from "@angular/common";
import { DayGradesComponent } from './day-grades/day-grades.component';
// import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {GradesModule} from '../shared/grades/grades.module';
import { ReportCardHttpService } from "./report-card-http.service";
import { RecentGradesComponent } from "./recent-grades/recent-grades.component";
import { YearGradesComponent } from './year-grades/year-grades.component';
import { SubjectGradesComponent } from './subject-grades/subject-grades.component';
import { MatMenuModule, MatExpansionModule, MatSnackBarModule, MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from "@angular/material";
import { AllGradesComponent } from './all-grades/all-grades.component';
import { RouterModule } from '@angular/router';


@NgModule({
    entryComponents: [BottomSheetOverviewExampleSheet],
    declarations: [
        ReportCComponent, 
        DayGradesComponent,
        RecentGradesComponent,
        YearGradesComponent,
        SubjectGradesComponent,
        AllGradesComponent,
        BottomSheetOverviewExampleSheet
    ],
    imports: [
        ReportCardRoutingModule,
        CommonModule,
        MatListModule,
        GradesModule,
        MatMenuModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatButtonModule,
        MatBottomSheetModule,
        RouterModule
        //input other modules here
    ],
    exports: [
        ReportCComponent, 
        DayGradesComponent,
        RecentGradesComponent,
        YearGradesComponent,
        SubjectGradesComponent,
        AllGradesComponent
    ],
    providers: [
        ReportCardHttpService,
        {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true,autoFocus: false}}
    ]
})

export class ReportCardModule{}

