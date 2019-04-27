import { GroupsRoutingModule } from './groups.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';

@NgModule({
  declarations: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ],
  exports: [
    GroupsComponent
  ]
})
export class GroupsModule { }
