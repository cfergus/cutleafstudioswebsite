import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Knife } from '../../models/knife';

@Component({
  selector: 'app-hollow-grind',
  templateUrl: './hollow-grind.component.html',
  styleUrls: ['./hollow-grind.component.scss']
})
export class HollowGrindComponent implements OnInit, OnDestroy {

  @Input('knife')
  public knife: Knife;

  // Common

  svgViewBoxSize = 400;

  // Properties of hollow grind
  edgeMargin = 20;
  wheelRadius = 1500;

  constructor() {

  }

  // maxDimension() {
  //   Math.max(self.bladeWidth, self.bladeThickness);
  // }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
