import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsComponent } from './settings.component';
import { MatDividerModule, MatButtonModule, MatExpansionModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NotificationSettingsComponent,
    EditProfileComponent,
    SettingsComponent
  ],
  imports: [
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  exports: [
    NotificationSettingsComponent,
    EditProfileComponent,
    SettingsComponent,
    MatDividerModule
  ]
})
export class SettingsModule { }
