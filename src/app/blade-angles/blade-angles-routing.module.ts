import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BladeAnglesComponent } from './blade-angles.component';


const routes: Routes = [
  { path: 'blade-angles', component: BladeAnglesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BladeAnglesRoutingModule { }
