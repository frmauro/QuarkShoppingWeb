import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://127.0.0.1:5237';

  constructor(private http: HttpClient) { }

  salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/api/Categories`, categoria);
  }

  obterTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/api/Categories`);
  }

}
