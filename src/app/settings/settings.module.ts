import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsComponent } from './settings.component';
import { MatDividerModule, MatButtonModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    NotificationSettingsComponent,
    EditProfileComponent,
    SettingsComponent
  ],
  imports: [
    MatDividerModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [
    NotificationSettingsComponent,
    EditProfileComponent,
    SettingsComponent
  ]
})
export class SettingsModule { }