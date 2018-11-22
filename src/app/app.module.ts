import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatToolbarModule, MatMenuModule, MatListModule, MatIconModule } from '@angular/material';

import { SharedMaterialModule } from './shared/shared-material.module';

import { environment } from '../environments/environment';
import { KnifeModule } from './knife/knife.module';
import { AboutModule } from './about/about.module';
import { BladeAnglesModule } from './blade-angles/blade-angles.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule, 

    FlexLayoutModule,

    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,

    SharedMaterialModule,
    
    KnifeModule,
    AboutModule,
    BladeAnglesModule,
    
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
