import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Knife, IKnife } from '../../models/knife';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-knife',
  templateUrl: './knife-list.component.html',
  styleUrls: ['./knife-list.component.scss']
})
export class KnifeListComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firestorage: AngularFireStorage ) { }

// TODO : couldn't handle casting the "img_url" to IKnife. Might need to figure that out
// TODO : Only works on Primary image. Make more flexible.

  private knivesCollection: AngularFirestoreCollection<any>;
  knives: Observable<any[]>;


  ngOnInit() {
    this.knivesCollection = this.firestore.collection<any>('knives');
    // this.knives = this.knivesCollection.valueChanges();


    this.knives = this.knivesCollection.snapshotChanges().map( actions => {

      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
      });

    });
  }


}
