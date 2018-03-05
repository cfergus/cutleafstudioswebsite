import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { IKnife, Knife, IKnifeImage, KnifeImage } from '../../models/knife';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';


import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map, filter, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-knife-edit',
  templateUrl: './knife-edit.component.html',
  styleUrls: ['./knife-edit.component.scss']
})
export class KnifeEditComponent implements OnInit, OnDestroy {

  knifeId: string;
  private routerParamSub$: any;

  private knifeDoc: AngularFirestoreDocument<IKnife>;
  knife: Observable<IKnife>;

  knifeForm: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private fb: FormBuilder ) {

  }

  ngOnInit() {

    this.routerParamSub$ = this.route.params.subscribe(params => {
      this.knifeId = params['id'];

      this.knifeDoc = this.firestore.doc<IKnife>(`knives/${this.knifeId}` );
      // TODO : Determine if knife id is invalid, not found, etc. Possibly as a route guard instead of onInit.

      this.knife = this.knifeDoc.valueChanges();
      this.buildForm();
    });
  }

  ngOnDestroy() {
    this.routerParamSub$.unsubscribe();
    // TODO : unsubscribe everything?
  }

  updateKnife() {
    // TODO : Move CRUD functions to service :
    // https://angularfirebase.com/lessons/reactive-forms-in-angular-with-the-firebase-database/
    if (this.knifeForm.status != 'VALID') {
      console.log('form is not valid, cannot save to database');
      return;
    }

    const data = this.knifeForm.value;
    // TODO : deep clone array values?
    this.knifeDoc.update( data );
  }

  revert() {
    // TODO : revert form
  }

  private buildForm() {
    this.knifeForm = this.fb.group({
      // General Info
      name:    ['', Validators.required ],
      shortDescription:  [''],
      longDescription:  [''],

      // Images
      additionalImages: this.fb.array([
      ]),
      primaryImage:    this.initKnifeImageControl()
    });
    this.knife.subscribe(k => {
      this.knifeForm.patchValue(k);
      // TODO : Strange behavior here; uncertain how to handle arrays from firebase
      // possible help? https://stackoverflow.com/questions/43934396/angular-4-patchvalue-based-on-index-in-formarray
      this.additionalImages.patchValue( k.additionalImages );
    })
  }

  get additionalImages(): FormArray {
    return this.knifeForm.get('additionalImages') as FormArray;
  }

  initKnifeImageControl() {
    return this.fb.group( new KnifeImage() );
  }


  addAdditionalImage() {
    this.additionalImages.push( this.initKnifeImageControl() );
  }

  removeAdditionalImage( index: number ) {
    // if( index >= 0 && index < / ) {
    //
    // }

  }


}
