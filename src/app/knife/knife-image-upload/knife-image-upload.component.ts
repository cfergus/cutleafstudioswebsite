import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map, filter, tap, take } from 'rxjs/operators';


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
