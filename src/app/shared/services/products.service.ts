import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/products.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getAll(){
    return this.httpClient.get<Product[]>('/api/products')
  }

  getProduct(id: string){
    return this.httpClient.get<Product>(`/api/products/${id}`)
  }

  createProduct(payload: ProductPayload){
    console.log("chegou", payload)
    return this.httpClient.post('/api/products', payload)
  }

  editProduct(id: string, payload: ProductPayload){
    return this.httpClient.put(`/api/products/${id}`, payload)
  }

  constructor() { }
}
