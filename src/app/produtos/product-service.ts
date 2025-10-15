import { HttpClient, HttpParams } from '@angular/common/http';
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

  obterPorFiltros(name: string, categoria: string): Observable<Produto[]> {
    let url = "/api/products";

    if (!name && !categoria) {
      return this.http.get<Produto[]>(url);
    }

    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }

    if (categoria) {
      params = params.set('category', categoria);
    }

    return this.http.get<Produto[]>(url, {
      params: params
    });
  }
  
}
