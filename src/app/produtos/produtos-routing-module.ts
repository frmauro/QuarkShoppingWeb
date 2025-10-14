import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Produto } from './produto/produto';

const routes: Routes = [
  {
    path: '',
    component: Produto
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
