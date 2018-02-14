import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedMaterialModule } from '../../shared/shared-material.module';


import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { IKnife, Knife } from '../../models/knife';

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
      additionalImages: this.fb.array([
        this.fb.group({
          description: [''],
          url: ['']
        })
      ]),
      primaryImage:    this.fb.group({ // TODO : Convert to fb.group( new KnifeImage() )
        description: '',
        url: ''
      })
    });
    // this.knife.subscribe(knifeForm => {
    //   this.knifeForm.patchValue(knife);
    // })
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
    this.knivesCollection.add( data );
    this.router.navigate([`/knives/notsureyet/edit`]);

    // TODO : retrieve or set id value
    // const newId = this.firestore.createId();
    // data.id = newId;
    // this.knivesCollection.add( data );
    //
    // this.router.navigate([`/knives/${newId}/edit`]);
  }

}
