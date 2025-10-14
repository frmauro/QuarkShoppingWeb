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
        .then(m => m.CategoriasModule)
      },
      {
        path: 'produtos', 
        loadChildren: () => import('../produtos/produtos-module')
        .then(m => m.ProdutosModule)
      },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
