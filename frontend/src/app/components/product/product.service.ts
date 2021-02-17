import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {EMPTY, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

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

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'X', {
      duration: 70000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product> {
    product.price  = Number(product.price);
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(map(obj => obj), catchError(err => this.errorHandler(err)));
  }


  errorHandler(err: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(map(obj => obj), catchError(err => this.errorHandler(err)));
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`

    return this.http.get<Product>(url)
      .pipe(map(obj => obj), catchError(err => this.errorHandler(err)));
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`

    product.price = Number(product.price);

    return this.http.put<Product>(url, product)
      .pipe(map(obj => obj), catchError(err => this.errorHandler(err)));
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`

    return this.http.delete<Product>(url)
      .pipe(map(obj => obj), catchError(err => this.errorHandler(err)));
  }
}
