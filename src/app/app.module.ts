import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ReportCComponent } from './report-c/report-c.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule, MatRippleModule, MatDialogModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { OldGradesComponent } from './report-c/old-grades/old-grades.component';
import { GradesComponent } from './report-c/grades/grades.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditProfileComponent } from './settings/edit-profile/edit-profile.component';
import { NotificationSettingsComponent } from './settings/notification-settings/notification-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdditionalSubjectsComponent } from './auth/register/subjects/additional-subjects/additional-subjects.component';
import { CredentialsComponent } from './auth/register/credentials/credentials.component';
import { SubjectsComponent } from './auth/register/subjects/subjects.component';
import { ScheduleInputComponent } from './auth/register/schedule-input/schedule-input.component';



@NgModule({
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ReportCComponent,
    CalendarComponent,
    ScheduleComponent,
    SettingsComponent,
    OldGradesComponent,
    GradesComponent,
    NotFoundComponent,
    EditProfileComponent,
    NotificationSettingsComponent,
    LoginComponent,
    RegisterComponent,
    AdditionalSubjectsComponent,
    CredentialsComponent,
    SubjectsComponent,
    ScheduleInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AdditionalSubjectsComponent]
})
export class AppModule { }
