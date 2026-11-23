import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartItem, OrderSubmission, getCartItemUnitPrice } from '../types/cart';
import { CheckoutForm } from './CheckoutForm';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totalAmount: number;
  lastOrder: OrderSubmission | null;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onSubmitOrder: (
    data: Omit<OrderSubmission, 'orderNumber' | 'items' | 'totalAmount'>
  ) => void;
  onResetConfirmation: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  totalAmount,
  lastOrder,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onSubmitOrder,
  onResetConfirmation,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (lastOrder) {
      setStep('checkout');
    } else if (items.length === 0) {
      setStep('cart');
    }
  }, [lastOrder, items.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Корзина и оформление заказа"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-4 sm:px-6 h-14 sm:h-16 border-b border-[#E5E5E2] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <ShoppingBag className="w-5 h-5 text-[#15803D] shrink-0" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-bold text-[#18181B] truncate">
              {step === 'checkout' ? 'Оформление заказа' : 'Ваш заказ'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть корзину"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-[#52525B] hover:text-[#18181B] hover:bg-[#F2F2F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === 'checkout' || lastOrder ? (
            <div className="space-y-4">
              {!lastOrder && (
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="min-h-[44px] px-3 -ml-3 text-sm font-semibold text-[#15803D] hover:underline cursor-pointer"
                >
                  ← Вернуться к составу корзины
                </button>
              )}
              <CheckoutForm
                items={items}
                totalAmount={totalAmount}
                lastOrder={lastOrder}
                onSubmitOrder={onSubmitOrder}
                onResetConfirmation={() => {
                  onResetConfirmation();
                  setStep('cart');
                }}
                onGoToMenu={onClose}
              />
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 rounded-full bg-[#F2F2F0] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#52525B]" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#18181B]">
                В корзине пока пусто
              </h3>
              <p className="mt-1.5 text-sm text-[#52525B] max-w-xs">
                Добавьте блюда из меню, чтобы рассчитать сумму и оформить заказ.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 min-h-[44px] px-6 rounded-lg bg-[#18181B] hover:bg-[#15803D] text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Перейти в меню
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#52525B] tabular-nums">
                  Позиций: {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="min-h-[44px] px-2 text-xs font-medium text-[#52525B] hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Очистить корзину
                </button>
              </div>

              <ul className="divide-y divide-[#E5E5E2]">
                {items.map((item) => {
                  const unitPrice = getCartItemUnitPrice(item);
                  const rowTotal = unitPrice * item.quantity;

                  return (
                    <li key={item.key} className="py-4 first:pt-0 space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-semibold text-[#18181B] leading-snug">
                            {item.dish.name}
                          </h3>
                          <p className="text-xs text-[#52525B] mt-0.5 tabular-nums">
                            {item.dish.weight} · {unitPrice.toLocaleString('ru-RU')} ₽
                          </p>
                          {item.selectedAddons.length > 0 && (
                            <p className="text-xs text-[#15803D] mt-1">
                              + {item.selectedAddons.map((a) => a.name).join(', ')}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Удалить ${item.dish.name}`}
                          className="min-w-[44px] min-h-[44px] -mr-2 inline-flex items-center justify-center rounded-lg text-[#71717A] hover:text-[#B91C1C] hover:bg-[#FEE2E2]/40 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-lg border border-[#E5E5E2] bg-[#F8F8F7]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label={`Уменьшить количество ${item.dish.name}`}
                            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#18181B] hover:bg-[#E5E5E2]/60 rounded-l-lg cursor-pointer"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="min-w-[28px] text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label={`Увеличить количество ${item.dish.name}`}
                            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#18181B] hover:bg-[#E5E5E2]/60 rounded-r-lg cursor-pointer"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="text-sm sm:text-base font-bold text-[#18181B] tabular-nums">
                          {rowTotal.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Drawer Footer for Cart Step */}
        {step === 'cart' && items.length > 0 && !lastOrder && (
          <div className="p-4 sm:p-6 border-t border-[#E5E5E2] bg-[#F8F8F7] space-y-3 shrink-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm text-[#52525B]">Сумма заказа</span>
              <span className="text-xl font-bold text-[#18181B] tabular-nums">
                {totalAmount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <p className="text-xs text-[#52525B]">
              Доставка или самовывоз выбираются на следующем шаге.
            </p>
            <button
              type="button"
              onClick={() => setStep('checkout')}
              className="w-full min-h-[48px] px-6 rounded-lg bg-[#15803D] hover:bg-[#166534] text-sm sm:text-base font-semibold text-white transition-colors cursor-pointer"
            >
              Перейти к оформлению
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
