import { CartItem } from './cart-item.model';

export interface Cart {
  id: number;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: number; // 0 = ativo, 1 = finalizado
  createdAt: Date;
}
