import { Component, OnInit } from '@angular/core';
import { Produto } from '../../produtos/produto';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria-service';
import { ProductService } from '../../produtos/product-service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss'
})
export class Galeria implements OnInit {

  products: Produto[] = [];
  categories: Categoria[] = [];
  selectedCategory: string = '';
  productName: string = '';

  constructor(
    private categoryService: CategoriaService, 
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.obterTodos()
    .subscribe(categories => this.categories = categories);

    this.productService.obterTodos()
    .subscribe(products => this.products = products);
  }

  filtrar(): void {
    this.productService.obterPorFiltros(this.productName, this.selectedCategory)
    .subscribe(products => this.products = products);
  }
}
