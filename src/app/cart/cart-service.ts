import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from './cart.model';
import { CartItem } from './cart-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  private apiUrl = 'http://127.0.0.1:5002';

  constructor(private http: HttpClient) {
    const initial: Cart = {
      id: 1,
      userId: 'user123',
      items: [],
      totalPrice: 0,
      status: 0,
      createdAt: new Date()
    };

    this.cartSubject = new BehaviorSubject<Cart>(initial);
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  currentCart(): Cart {
    return this.cartSubject.value;
  }

  addItem(item: Omit<CartItem, 'id' | 'cartId'> & Partial<Pick<CartItem, 'id' | 'cartId'>>): void {
    const cart = { ...this.currentCart() } as Cart;

    const newId = cart.items.length > 0 ? Math.max(...cart.items.map(i => i.id)) + 1 : 1;

    const cartItem: CartItem = {
      id: item.id ?? newId,
      productId: item.productId,
      nameProduct: item.nameProduct,
      quantity: item.quantity ?? 1,
      price: item.price ?? 0,
      cartId: item.cartId ?? cart.id
    };

    //faz a chamada para salvar no backend api
      this.http.post<CartItem>(`${this.apiUrl}/api/CartItems`, cartItem).subscribe();

    cart.items = [...cart.items, cartItem];
    cart.totalPrice = cart.items.reduce((s, it) => s + it.price * it.quantity, 0);

    this.cartSubject.next(cart);
  }

  clear(): void {
    const cart: Cart = {
      id: this.currentCart().id,
      userId: this.currentCart().userId,
      items: [],
      totalPrice: 0,
      status: 0,
      createdAt: new Date()
    };
    this.cartSubject.next(cart);
  }
}
