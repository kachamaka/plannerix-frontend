import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GradesComponent} from './grades.component';

@NgModule({
    declarations: [GradesComponent],
    imports: [ CommonModule ],
    exports: [GradesComponent],
    providers: [],
})
export class GradesModule {}