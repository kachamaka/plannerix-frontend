import { GroupEventComponent } from './group-event/group-event.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
// import { NgModel } from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDatepicker } from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EventColorDirective } from '../event/event-color.directive';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        GroupDialogComponent,
        GroupEventComponent,
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ], exports: [
        GroupDialogComponent,
        GroupEventComponent,
    ]
})

export class GroupDialogModule {}