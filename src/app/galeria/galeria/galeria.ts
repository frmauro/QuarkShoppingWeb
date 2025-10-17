import { Component, OnInit } from '@angular/core';
import { Produto } from '../../produtos/produto';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria-service';
import { ProductService } from '../../produtos/product-service';
import { CartService } from '../../cart/cart-service';
import { Router } from '@angular/router';

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
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('Galeria carregada');
    this.categoryService.obterTodos()
    .subscribe(categories => { 
      this.categories = categories
      //console.log('Categorias carregadas: ', this.categories);
    });

    this.productService.obterTodos()
    .subscribe(products =>  { 
      this.products = products
      console.log('Produtos carregados: ', this.products);
    });
  }

  filtrar(): void {
    this.productService.obterPorFiltros(this.productName, this.selectedCategory)
    .subscribe(products => this.products = products);
  }

  addProductAndGoToCart(product: Produto): void {
    // create a cart item from product
    this.cartService.addItem({
      productId: (product.id as unknown as number) || 0,
      nameProduct: product.name,
      price: product.price || 0,
      quantity: 1
    });

    // navigate to cart
    this.router.navigate(['/paginas/cart']);
  }
}
