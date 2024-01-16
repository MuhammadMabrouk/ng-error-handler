import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/core/toastr/toastr.service';
import { ProductsService } from './products.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // fetch all products
    this.getProducts();
  }

  // fetch all products
  getProducts() {
    this.productsService.getAll().subscribe({
      next: (res) => (this.products = res['products']),
      error: console.log,
    });
  }

  // create product
  createProduct() {
    const product: Omit<Product, 'id'> = { title: 'New product!!' };
    this.productsService.create(product).subscribe({
      next: (res: Product) => {
        this.products = [res, ...this.products];
        this.toastr.success({
          message: 'Product has been created successfully!',
        });
      },
      error: console.log,
    });
  }

  // update product
  updateProduct() {
    const product: Product = { id: 1, title: 'Updated product!!' };
    this.productsService.create(product).subscribe({
      next: (res: Product) => {
        this.toastr.success({
          message: 'Product has been updated successfully!',
        });
      },
      error: console.log,
    });
  }

  // delete product
  deleteProduct(product: any) {
    this.productsService.delete(product).subscribe({
      next: () => {
        this.products = this.products.filter((item) => item.id !== product.id);
        this.toastr.success({
          message: 'Product has been deleted successfully!',
        });
      },
      error: console.log,
    });
  }
}
