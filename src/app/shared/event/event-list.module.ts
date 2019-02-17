// import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { EventComponent } from "./event.component";
import { EventColorDirective } from "./event-color.directive";
import { EventDialogComponent } from "./event-dialog/event-dialog.component";
import { ReadOnlyDirective } from "./event-dialog/read-only.directive";
import { CommonModule } from "@angular/common";
import { MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDatepicker } from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        EventComponent, 
        EventColorDirective, 
        EventDialogComponent,
        ReadOnlyDirective

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
        MatNativeDateModule,
    ], exports: [
        EventComponent, 
        EventColorDirective, 
        EventDialogComponent,
        ReadOnlyDirective
    ]
})

export class EventListModule {}