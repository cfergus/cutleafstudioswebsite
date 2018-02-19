import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatDividerModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule
  ]
})
export class SharedMaterialModule { }
