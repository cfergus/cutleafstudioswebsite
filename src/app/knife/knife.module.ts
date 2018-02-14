import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { KnifeRoutingModule } from './knife-routing.module';

import { SharedMaterialModule } from '../shared/shared-material.module';

import { KnifeDetailComponent } from './knife-detail/knife-detail.component';
import { KnifeListComponent } from './knife-list/knife-list.component';
import { KnifeCreateComponent } from './knife-create/knife-create.component';
import { KnifeEditComponent } from './knife-edit/knife-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    KnifeRoutingModule,
    SharedMaterialModule
  ],
  declarations: [
    KnifeListComponent,
    KnifeDetailComponent,
    KnifeCreateComponent,
    KnifeEditComponent
  ]
})
export class KnifeModule { }
