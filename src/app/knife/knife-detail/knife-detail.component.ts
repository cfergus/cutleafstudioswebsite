import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKnife, Knife, IKnifeImage, KnifeImage } from '../../models/knife';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-knife-detail',
  templateUrl: './knife-detail.component.html',
  styleUrls: ['./knife-detail.component.scss']
})
export class KnifeDetailComponent implements OnInit, OnDestroy {

  private routerParamSub$: any;
  private knifeDoc: AngularFirestoreDocument<IKnife>;
  knifeId: string;
  knife: Observable<IKnife>;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get knife

    this.routerParamSub$ = this.route.params.subscribe(params => {
      this.knifeId = params['id'];

      this.knifeDoc = this.firestore.doc<IKnife>(`knives/${this.knifeId}` );
      // TODO : Determine if knife id is invalid, not found, etc. Possibly as a route guard instead of onInit.

      this.knife = this.knifeDoc.valueChanges();
    });

  }

  ngOnDestroy() {
    this.routerParamSub$.unsubscribe();
  }

}
