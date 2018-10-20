import { Component } from '@angular/core';
import { HSLState, HSLStateModel, SetHue, SetLightness, SetSaturation } from './hsl.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SetHex } from '../color.state';
import { HSL } from 'three';
import Util from '../util';

@Component({
  selector: 'app-hsl',
  templateUrl: './hsl.component.html',
  styleUrls: ['./hsl.component.scss']
})
export class HSLComponent {
  @Select(HSLState) hsl$: Observable<HSLStateModel>;
  hsl: HSL = {
    h: 0,
    s: 0,
    l: 0
  };

  constructor(private _router: Router, private _store: Store) {
    this.hsl$.subscribe((hsl: HSLStateModel) => {
      this.hsl = hsl;
    });
  }
  
  hueChanged($event) {
    this._store.dispatch(new SetHue(parseFloat($event.target.value)));
  }

  saturationChanged($event) {
    this._store.dispatch(new SetSaturation(parseFloat($event.target.value)));
  }
  
  lightnessChanged($event) {
    this._store.dispatch(new SetLightness(parseFloat($event.target.value)));
  }

  onNext() {
    this._store.dispatch(new SetHex(Util.HSL2Hex(this.hsl.h, this.hsl.s, this.hsl.l)));
  }
}
