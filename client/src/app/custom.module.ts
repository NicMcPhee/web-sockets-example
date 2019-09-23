import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatExpansionModule,
  MatListModule,
  MatTooltipModule,
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule
} from '@angular/material';

import {FlexLayoutModule,} from '@angular/flex-layout';

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  BrowserAnimationsModule,
  FormsModule,
];

const MATERIAL_MODULES: any[] = [
  MatListModule,
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdCardModule,
  MdMenuModule,
  MdSidenavModule,
  MdInputModule,
  MatExpansionModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    FLEX_LAYOUT_MODULES,
  ],
  declarations: [],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    FLEX_LAYOUT_MODULES,
  ]
})

export class CustomModule {
}
