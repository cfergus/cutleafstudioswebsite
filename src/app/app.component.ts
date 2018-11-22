import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CutLeaf Studios';

  constructor(public afAuth: AngularFireAuth, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // this.user = afAuth.authState;
    iconRegistry.addSvgIcon(
      'cutleaf-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/cutleaf-logo.svg'));

  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
