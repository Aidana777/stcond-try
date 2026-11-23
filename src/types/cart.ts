import { Dish, DishAddon } from '../data/menuData';

export interface CartItem {
  key: string;
  dish: Dish;
  selectedAddons: DishAddon[];
  quantity: number;
}

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'card' | 'cash';

export interface OrderSubmission {
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  preferredTime: string;
  paymentMethod: PaymentMethod;
  comment?: string;
  items: CartItem[];
  totalAmount: number;
}

export function buildCartKey(dishId: string, addons: DishAddon[]): string {
  const addonIds = addons
    .map((a) => a.id)
    .sort()
    .join(',');
  return addonIds ? `${dishId}__${addonIds}` : dishId;
}

export function getCartItemUnitPrice(item: CartItem): number {
  const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  return item.dish.price + addonsTotal;
}
