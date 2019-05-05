import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { ModifySchemeRouting } from "./modify-scheme.routing";
import { ModifyScheduleComponent } from "./modify-schedule.component";
import { ModifyScheduleState } from "../states/modifySchedule.state";
import { SubjectsComponent } from './subjects/subjects.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MiscComponent } from './misc/misc.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule, MatInputModule, MatTooltipModule, MatChipsModule, MatIconModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { SubjectComponent } from './subjects/subject/subject.component';
import { AddSubjectComponent } from './subjects/add-subject/add-subject.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ChoseSubjectComponent } from './schedule/chose-subject/chose-subject.component';
import { DailyScheduleComponent } from './schedule/daily-schedule/daily-schedule.component';
import { DayPickerComponent } from './schedule/day-picker/day-picker.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ChoiceDialogComponent } from './schedule/chose-subject/choice-dialog/choice-dialog.component';
import { LessonComponent } from './schedule/daily-schedule/lesson/lesson.component';
import { TimePipe } from "../models/timeConverter.model";
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
    declarations: [
        ModifyScheduleComponent,
        SubjectsComponent,
        ScheduleComponent,
        MiscComponent,
        SubjectComponent,
        AddSubjectComponent,
        ChoseSubjectComponent,
        DailyScheduleComponent,
        DayPickerComponent,
        ChoiceDialogComponent,
        LessonComponent,
        TimePipe
    ],
    imports: [
        CommonModule,
        ModifySchemeRouting,
        NgxsModule.forFeature([
            ModifyScheduleState
        ]),
        MatStepperModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatIconModule
    ],
    entryComponents: [
        AddSubjectComponent,
        ChoiceDialogComponent
    ]
  })
  export class ModifyScheduleModule { }