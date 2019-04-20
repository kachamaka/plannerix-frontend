import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModifyScheduleComponent } from "./modify-schedule.component";

let routes: Routes = [
    {path: "", component: ModifyScheduleComponent}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ModifySchemeRouting {}