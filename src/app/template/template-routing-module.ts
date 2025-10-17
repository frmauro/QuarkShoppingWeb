import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [ 
      {
        path: 'categorias', 
        loadChildren: () => import('../categorias/categorias-module')
        .then(m => m.CategoriasModule),
        pathMatch: 'full'
      },
      {
        path: 'produtos', 
        loadChildren: () => import('../produtos/produtos-module')
        .then(m => m.ProdutosModule),
        pathMatch: 'full'
      },
      {
        path: 'galeria', 
        loadChildren: () => import('../galeria/galeria-module')
        .then(m => m.GaleriaModule),
        pathMatch: 'full'
      },
      {
        path: 'cart', 
        loadChildren: () => import('../cart/cart-module')
        .then(m => m.CartModule),
        pathMatch: 'full'
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
