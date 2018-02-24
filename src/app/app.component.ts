import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CutLeaf Studios';

  user: Observable<firebase.User>;

  constructor( public afAuth: AngularFireAuth, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {
    this.user = afAuth.authState;
    iconRegistry.addSvgIcon(
        'cutleaf-logo',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/images/cutleaf-logo.svg'));

  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
