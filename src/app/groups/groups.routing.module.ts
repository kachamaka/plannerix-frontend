import { GroupComponent } from './group/group.component';
import { GroupsComponent } from './groups.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: GroupsComponent },
    { path: 'singleGroup/:group_id', component: GroupComponent },
    { path: 'singleGroup', pathMatch: "full", redirectTo: '' }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class GroupsRoutingModule{}
