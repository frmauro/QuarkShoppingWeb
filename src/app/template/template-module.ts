import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing-module';
import { Layout } from './layout/layout';
import { CategoriasModule } from '../categorias/categorias-module';
import { CartModule } from '../cart/cart-module';


@NgModule({
  declarations: [
    Layout
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    CategoriasModule,
    CartModule
  ]
})
export class TemplateModule { }
