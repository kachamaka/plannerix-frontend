import { MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GradesComponent} from './grades.component';
import { GradeDialogComponent } from './grade-dialog/grade-dialog.component';
import { MatDialogModule } from '@angular/material';
import { GradeToastComponent } from './grade-toast/grade-toast.component';

@NgModule({
    declarations: [GradesComponent, GradeDialogComponent, GradeToastComponent],
    imports: [ 
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule
    ],
    exports: [GradesComponent],
    providers: [],
})
export class GradesModule {}