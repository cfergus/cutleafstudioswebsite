import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BladeAnglesRoutingModule } from './blade-angles-routing.module';

import { SharedMaterialModule } from '../shared/shared-material.module';
import { MatTabsModule } from '@angular/material/tabs';

import { BladeAnglesComponent } from './blade-angles.component';
import { HollowGrindComponent } from './hollow-grind/hollow-grind.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BladeAnglesRoutingModule,
    SharedMaterialModule,
    MatTabsModule
  ],
  declarations: [
    BladeAnglesComponent,
    HollowGrindComponent
  ]
})
export class BladeAnglesModule { }
