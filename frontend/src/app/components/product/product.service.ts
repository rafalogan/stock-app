import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Observable} from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";


import { Product } from "./product.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${environment.serverUrl}/products`

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }
}