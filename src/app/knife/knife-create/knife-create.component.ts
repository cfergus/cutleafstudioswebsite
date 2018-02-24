import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedMaterialModule } from '../../shared/shared-material.module';


import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { IKnife, Knife, KnifeImage } from '../../models/knife';

@Component({
  selector: 'app-knife-create',
  templateUrl: './knife-create.component.html',
  styleUrls: ['./knife-create.component.scss']
})
export class KnifeCreateComponent implements OnInit {

  private knivesCollection: AngularFirestoreCollection<IKnife>;
  knives: Observable<IKnife[]>;
  // knifeToAdd: IKnife;

  knifeForm: FormGroup;

  canSubmit = true;

  constructor(
      private firestore: AngularFirestore,
      private fb: FormBuilder,
      private router: Router ) {

  }

  ngOnInit() {

    this.knivesCollection = this.firestore.collection<IKnife>('knives');
    this.knives = this.knivesCollection.valueChanges();
    this.buildForm();
  }


  private buildForm() {
    this.knifeForm = this.fb.group({
      name:    ['', Validators.required ],
      additionalImages: this.fb.array([ ]),
      primaryImage:    this.initKnifeImageControl()
    });
  }

  initKnifeImageControl() {
    return this.fb.group(
      new KnifeImage()
    );
  }

  addKnife() {

    // Disable user from submitting again
    this.canSubmit = false;

    if (this.knifeForm.status != 'VALID') {
      console.log('form is not valid, cannot save to database');
      return;
    }

    const data = this.knifeForm.value;
    // TODO : deep clone array values?
    /*
    TODO : Should we create our own id? autogenerate? Use ID for url path? https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    suggested approach is to :
    - restrict valid names (minlength, max, special chars, etc)
    - slugify name - https://github.com/paulsmith/angular-slugify/blob/master/angular-slugify.js
    - test to see if it already exists (or check for error on create)
    - perform a 'reslugify' if needed
    - add slug name as id
    */
    // this.knivesCollection.add( data );
    const slugName = data.name.replace(/\s/g, "-");
    this.knivesCollection.doc(slugName).set(data)
    .then( () => {
      this.router.navigate([`/knives/${slugName}/edit`]);
    } )
    .catch( (error) => {
      console.error( "Error while trying to create knife: ", error );
      this.canSubmit = true;
    } );

  }

}
