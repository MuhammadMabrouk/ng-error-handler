import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/core/services/base-http.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttpService<Product> {
  override url = 'https://dummyjson.com/products';
}
