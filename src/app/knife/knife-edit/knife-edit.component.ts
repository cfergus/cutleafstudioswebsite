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

  // Image upload
  // See https://github.com/davideast/angularfire-storage/blob/master/src/app/app.component.ts for more info
  previewURL$: Observable<any>;
  file: Blob;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadPercent$: Observable<number>;
  uploadURL$: Observable<string>;
  uploadState$: Observable<string>;

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
      // this.knifeDoc = this.firestore.doc<IKnife>('knives/5S9dK6ibYVhIJc5raZeO' );
      // TODO : Test invalid knife
      //  this.knifeDoc = this.firestore.doc<IKnife>( 'notaknife' );

      // Do we need id for edits?: https://github.com/angular/angularfire2/blob/master/docs/firestore/documents.md#snapshotchanges
      this.knife = this.knifeDoc.valueChanges();
      this.buildForm();
    });
  }

  ngOnDestroy() {
    this.routerParamSub$.unsubscribe();
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
      name:    ['', Validators.required ],
      // description:  ['', Validators.required ],
      additionalImages: this.fb.array([
        this.fb.group({
          description: [''],
          url: ['']
        })
      ]),
      primaryImage:    this.fb.group({
        description: [''],
        url: ['']
      })
    });
    this.knife.subscribe(k => {
      this.knifeForm.patchValue(k);
      this.additionalImages.patchValue( k.additionalImages );
    })
  }

  get additionalImages(): FormArray {
    return this.knifeForm.get('additionalImages') as FormArray;
  }


  addAdditionalImage() {
    this.additionalImages.push( this.fb.group( new KnifeImage() ) );
  }

  removeAdditionalImage( index: number ) {
    // if( index >= 0 && index < ? ) {
    //
    // }

  }

  previewFile(event) {
    const file = event.target.files[0];
    if(!file) { return; }
    this.clearUpload();
    const reader = new FileReader();
    this.file = file;
    this.previewURL$ = fromEvent(reader, 'load').pipe(map((e: any) => e.target.result))
    reader.readAsDataURL(this.file);
  }

  uploadFile() {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.fireStorage.ref(`images/knives/${randomId}`);
    this.task = this.ref.put(this.file);
    this.uploadState$ = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadPercent$ = this.task.percentageChanges();
    this.uploadURL$ = this.task.downloadURL();
  }

  pauseUpload() {
    this.task.pause();
  }

  cancelUpload() {
    this.task.cancel();
    this.clearUpload();
  }

  resumeUpload() {
    this.task.resume();
  }

  deleteUpload() {
    this.ref.delete()
      .pipe(
        tap(() => this.clearUpload()),
        take(1)
      ).subscribe();
  }

  clearUpload() {
    this.previewURL$ = of(null);
    this.uploadPercent$ = of(0);
    this.uploadURL$ = of(null);
    this.file = null;
    this.uploadState$ = undefined;
  }

}
