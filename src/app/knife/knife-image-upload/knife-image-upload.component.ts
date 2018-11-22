import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';

import { Observable, fromEvent } from 'rxjs';
// import { fromEvent } from 'rxjs/observable/fromEvent';
// import { of } from 'rxjs/observable/of';
import { map, filter, tap, take, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-knife-image-upload',
  templateUrl: './knife-image-upload.component.html',
  styleUrls: ['./knife-image-upload.component.scss']
})
export class KnifeImageUploadComponent implements OnInit, OnDestroy{

  @Input('formGroup')
  public knifeImageForm: FormGroup;

  previewURL$: Observable<any>;
  file: Blob;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadPercent$: Observable<number>;
  uploadURL$: Observable<string>;
  uploadState$: Observable<string>;

  constructor(
    private fireStorage: AngularFireStorage
  ) {

  }

  ngOnInit() {
  }
  ngOnDestroy() {
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
    // this.ref = this.fireStorage.child(`images/knives/${randomId}`);
    this.ref = this.fireStorage.ref(`images/knives/${randomId}`);
    this.task = this.ref.put(this.file);
    this.uploadState$ = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadPercent$ = this.task.percentageChanges();
    // this.uploadURL$ = this.task.downloadURL();

    

    this.task.snapshotChanges().pipe(
      finalize( () => {
        this.uploadURL$ = this.ref.getDownloadURL();

        // Update the form value for the model when the upload completes
        this.uploadURL$.subscribe((value) => {
          console.log("url changed to " + value);
          this.knifeImageForm.value.url = value;
        });
      })
    ).subscribe();

/*
    this.task.on( firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error( error );
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

    // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        this.task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
        });
      }
    );
    */

    
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
    // TODO : dissociate image from knife when deleted?
    this.ref.delete()
      .pipe(
        tap(() => this.clearUpload()),
        // take(1)
      ).subscribe();
  }

  clearUpload() {
    // this.previewURL$ = of(null);
    // this.uploadPercent$ = of(0);
    // this.uploadURL$ = of(null);
    this.file = null;
    this.uploadState$ = undefined;
  }

}
