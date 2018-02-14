import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  knifeToAdd: IKnife;

  knifeForm: FormGroup;

  constructor(
      private firestore: AngularFirestore,
      private fb: FormBuilder ) {

    // TODO : default creation of object from class
    // TODO : Reusable placeholder image
    this.knifeToAdd = {
      name: '',
      primaryImage: {
        storageRef: '',
        url: '',
        description: 'Knife image coming soon'
      }
    };
    this.knivesCollection = firestore.collection<IKnife>('knives');
    this.knives = this.knivesCollection.valueChanges();
  }

  ngOnInit() {
  }


  private buildForm() {
    this.knifeForm = this.fb.group({
      name:    ['', Validators.required ],
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
    this.knivesCollection.add( this.knifeToAdd );
  }

}
