import { Component } from '@angular/core';
import { Cart } from '../cart.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../cart-item.model';
import { CartService } from '../cart-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {

  cart: Cart = {
    id: 1,
    userId: 'user123',
    items: [],
    totalPrice: 0,
    status: 0,
    createdAt: new Date()
  };

  private cartSub?: Subscription;

  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.itemForm = this.fb.group({
          nameProduct: ['', Validators.required],
          price: [0, [Validators.required, Validators.min(0.01)]],
          quantity: [1, [Validators.required, Validators.min(1)]]
        });
  }

  ngOnInit(): void {
    this.cartSub = this.cartService.getCart().subscribe(c => {
      this.cart = c;
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }


  addItem(): void {
    if (this.itemForm.invalid) return;

    this.cartService.addItem({
      productId: Math.floor(Math.random() * 10000),
      nameProduct: this.itemForm.value.nameProduct,
      quantity: this.itemForm.value.quantity,
      price: this.itemForm.value.price
    });

    this.itemForm.reset({ quantity: 1, price: 0 });
  }
  

  removeItem(id: number): void {
    const current = this.cartService.currentCart();
    const updated = { ...current, items: current.items.filter(item => item.id !== id) };
    updated.totalPrice = updated.items.reduce((s, it) => s + it.price * it.quantity, 0);
    // push updated cart directly into subject (no public setter) - use addItem/clear for simple api; here we'll replace
    (this.cartService as any).cartSubject?.next(updated);
  }

  updateTotal(): void {
    // now handled by CartService; keep for compatibility
    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  finalizeCart(): void {
    this.cart.status = 1; // finalizado
  }  

}
