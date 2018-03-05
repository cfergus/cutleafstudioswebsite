import { Component, OnInit, OnDestroy } from '@angular/core';

import { Knife } from '../models/knife';

@Component({
  selector: 'app-blade-angles',
  templateUrl: './blade-angles.component.html',
  styleUrls: ['./blade-angles.component.scss']
})
export class BladeAnglesComponent implements OnInit, OnDestroy {

  knife: Knife;
  // knifeForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.knife = new Knife();

  }

  ngOnDestroy() {

  }

}
