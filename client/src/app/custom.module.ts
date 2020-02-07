import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatExpansionModule,
  MatListModule,
  MatTooltipModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

import {FlexLayoutModule,} from '@angular/flex-layout';

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserComponent} from './users/user.component';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  BrowserAnimationsModule,
  FormsModule,
];

const MATERIAL_MODULES: any[] = [
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatSidenavModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatSelectModule,
  MatOptionModule,
];

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    FLEX_LAYOUT_MODULES,
  ],
  declarations: [
    UserComponent,
  ],
  exports: [
    UserComponent,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    FLEX_LAYOUT_MODULES,
  ]
})

export class CustomModule {
}
