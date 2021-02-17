import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
    this.product = {
      name: '',
      price: 0
    }
  }

  ngOnInit(): void {
    const id  = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.readById(id)
      .subscribe(product => this.product = product);
  }


  removeProduct(): void {
    if (this.product.id) this.productService.delete(this.product.id)
      .subscribe(() => this.productService.showMessage('Produto excluído com sucesso!'));

    this.router.navigate(['/products']);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }


}
