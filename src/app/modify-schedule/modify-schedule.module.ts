import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { ModifySchemeRouting } from "./modify-scheme.routing";
import { ModifyScheduleComponent } from "./modify-schedule.component";
import { ModifyScheduleState } from "../states/modifySchedule.state";
import { SubjectsComponent } from './subjects/subjects.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MiscComponent } from './misc/misc.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule, MatInputModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { SubjectComponent } from './subjects/subject/subject.component';
import { AddSubjectComponent } from './subjects/add-subject/add-subject.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [
        ModifyScheduleComponent,
        SubjectsComponent,
        ScheduleComponent,
        MiscComponent,
        SubjectComponent,
        AddSubjectComponent
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
        MatInputModule
    ],
    entryComponents: [
        AddSubjectComponent
    ]
  })
  export class ModifyScheduleModule { }