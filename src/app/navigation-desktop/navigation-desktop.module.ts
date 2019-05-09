import { NavigationDesktopComponent } from './navigation-desktop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatButtonModule, MatExpansionModule, MatSlideToggleModule, MatIconModule } from '@angular/material';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NavigationDesktopComponent
  ],
  imports: [
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NavigationDesktopComponent
  ]
})
export class NavigationDesktopModule { }
