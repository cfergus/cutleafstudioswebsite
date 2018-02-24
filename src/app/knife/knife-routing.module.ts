import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnifeListComponent } from './knife-list/knife-list.component';
import { KnifeDetailComponent } from './knife-detail/knife-detail.component';
import { KnifeCreateComponent } from './knife-create/knife-create.component';
import { KnifeEditComponent } from './knife-edit/knife-edit.component';

// TODO : Guards to protect edit/new unless authorized
// TODO : Handle errors throughout the app if permissions aren't adequate for firebase interaction

const routes: Routes = [
  { path: 'knives', component: KnifeListComponent },
  { path: 'knives/new', component: KnifeCreateComponent },
  { path: "knives/:id",
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail', component: KnifeDetailComponent },
      { path: 'edit', component: KnifeEditComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnifeRoutingModule { }
