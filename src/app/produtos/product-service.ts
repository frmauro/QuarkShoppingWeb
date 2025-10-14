import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>('/api/products');
  }

  obterPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`/api/products/${id}`);
  }
  
}
