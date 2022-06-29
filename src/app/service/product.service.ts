import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../core/entity/product";
import {Observable} from "rxjs";
import {Message} from "../utils/message";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  static urlApi: string = "http://localhost:8080/api/v1";

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${ProductService.urlApi}/products/list-products`);
  }

  getProductById(idProduct: string): Observable<Product> {
    return this.httpClient.get<Product>(`${ProductService.urlApi}/products/find-product-by-id/${idProduct}`);
  }

  addProduct(product: Product): Observable<Message> {
    return this.httpClient.post<Message>(`${ProductService.urlApi}/products/add`, product);
  }

  updateProduct(idProduct: string, product: Product): Observable<Message> {
    return this.httpClient.put<Message>(`${ProductService.urlApi}/products/update/${idProduct}`, product);
  }

  deleteProduct(idProduct: string): Observable<Message> {
    return this.httpClient.delete<Message>(`${ProductService.urlApi}/products/delete/${idProduct}`);
  }
}
