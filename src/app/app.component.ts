import { Component, OnInit } from '@angular/core';
import { ToastrService } from './core/toastr/toastr.service';
import { Toast } from './core/toastr/toastr.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  toasts$: Observable<Toast[]>;

  products: any[] = [];

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  ngOnInit(): void {
    this.toasts$ = this.toastr.toasts$;

    // fetch all products
    this.getProducts();
  }

  addToast(type?: Toast['type']): void {
    this.toastr.add({
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      ...(type && { type }),
      // autoDismiss: false,
    });
  }

  // fetch all products
  getProducts() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('limit', 10);

    this.http
      .get('https://dummyjson.com/products', { params: queryParams })
      .subscribe({
        next: (res: any) => (this.products = res.products),
        error: console.log,
      });
  }

  // delete product
  deleteProduct(id: string) {
    this.http.delete(`https://dummyjson.com/products/${id}`)
      .subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          this.toastr.add({
            type: 'success',
            message: 'Product has been deleted successfully!',
          });
        },
        error: console.log,
      });
  }

  // mock and test any HTTP
  mockHttp(status: number) {
    this.http.get(`https://dummyjson.com/http/${status}`).subscribe();
  }
}
