import { GroupsRoutingModule } from './groups.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { GroupComponent } from './group/group.component';

@NgModule({

  declarations: [
    GroupsComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    GroupsComponent
  ]
})
export class GroupsModule { }
