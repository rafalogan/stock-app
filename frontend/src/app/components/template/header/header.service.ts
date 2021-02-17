import { Injectable } from '@angular/core';

import {BehaviorSubject} from "rxjs";

import {HeaderData} from "./header-data.model";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new  BehaviorSubject<HeaderData>({
    title: 'Stock App',
    icon: 'dashboard',
    routeUrl: ''
  })

  constructor() { }

  get headerData(): HeaderData {
    return this._headerData.value;
  }

  set headerData(data: HeaderData) {
    this._headerData.next(data);
  }


}
