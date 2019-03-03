import { HttpService } from './shared/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import { NgKnifeModule } from 'ng-knife';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule, MatRippleModule, MatDialogModule, DateAdapter, MatNativeDateModule, MatMenuModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
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
import { DatePipe, registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg';
import { AddTestComponent } from './calendar/add-test/add-test.component';
import { ReportCardModule } from './report-c/report-card.module';
import { DateTimeService } from './shared/date-time.service';
import { GradesModule } from './shared/grades/grades.module';
import { HomeComponent } from './home/home.component';
import { EventDialogComponent } from './shared/event/event-dialog/event-dialog.component';
import { EventListModule } from './shared/event/event-list.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GradeDialogComponent } from './shared/grades/grade-dialog/grade-dialog.component';
import { GradeToastComponent } from './shared/grades/grade-toast/grade-toast.component';
import { DesktopComponent } from './desktop/desktop.component';
import {SettingsModule} from './settings/settings.module';
import {HomeModule } from './home/home.module';
import {CalendarModule} from './calendar/calendar.module';
import {ScheduleModule} from './schedule/schedule.module';
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/notAuth.guard';
registerLocaleData(localeBg);


@NgModule({
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AdditionalSubjectsComponent,
    CredentialsComponent,
    SubjectsComponent,
    ScheduleInputComponent,
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
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatMenuModule,
    GradesModule,
    EventListModule,
    HttpModule,
    HttpClientModule,
    ServiceWorkerModule.register('sw-worker-custom.js', { enabled: environment.production }),
    SettingsModule,
    HomeModule,
    CalendarModule,
    ScheduleModule,
    NgKnifeModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: "bg-BG"
  }, DatePipe, DateTimeService, HttpService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    AdditionalSubjectsComponent,
    AddTestComponent,
    EventDialogComponent,
    GradeDialogComponent,
    GradeToastComponent
  ]
})
export class AppModule { }
