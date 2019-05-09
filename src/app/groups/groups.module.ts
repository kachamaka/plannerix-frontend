import { MatTabsModule } from '@angular/material/tabs';
import { GroupsRoutingModule } from './groups.routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatListModule, MatDividerModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { GroupComponent } from './group/group.component';
import { EventListModule } from '../shared/event/event-list.module';
import { AddMemberComponent } from './group/add-member/add-member.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    GroupsComponent,
    GroupComponent,
    AddMemberComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    EventListModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    GroupsComponent
  ],
  entryComponents: [
    AddMemberComponent
  ]
})
export class GroupsModule { }
