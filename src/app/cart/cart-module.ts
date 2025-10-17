import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing-module';
import { CartComponent } from './cart/cart';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule
  ],
  exports: [CartComponent]
})
export class CartModule { }
