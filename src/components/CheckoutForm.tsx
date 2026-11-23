import { CheckCircle2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import {
  CartItem,
  DeliveryMethod,
  OrderSubmission,
  PaymentMethod,
  getCartItemUnitPrice,
} from '../types/cart';

interface CheckoutFormProps {
  items: CartItem[];
  totalAmount: number;
  lastOrder: OrderSubmission | null;
  onSubmitOrder: (
    data: Omit<OrderSubmission, 'orderNumber' | 'items' | 'totalAmount'>
  ) => void;
  onResetConfirmation: () => void;
  onGoToMenu?: () => void;
}

export function CheckoutForm({
  items,
  totalAmount,
  lastOrder,
  onSubmitOrder,
  onResetConfirmation,
  onGoToMenu,
}: CheckoutFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('Как можно скорее');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (lastOrder) {
    return (
      <div className="p-5 sm:p-6 rounded-2xl border border-[#15803D]/30 bg-[#F0FDF4] space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="w-6 h-6 text-[#15803D] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#15803D] tabular-nums">
              Заказ №{lastOrder.orderNumber}
            </p>
            <h3 className="text-lg font-bold text-[#18181B] mt-0.5">
              Спасибо! Ваш заказ отправлен.
            </h3>
            <p className="text-sm text-[#52525B] mt-1">
              Мы свяжемся с вами для подтверждения по номеру {lastOrder.phone}.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#15803D]/15 text-sm space-y-1.5 text-[#18181B]">
          <div className="flex justify-between gap-2">
            <span className="text-[#52525B]">Получатель:</span>
            <span className="font-medium text-right">{lastOrder.customerName}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-[#52525B]">Способ:</span>
            <span className="font-medium text-right">
              {lastOrder.deliveryMethod === 'delivery' ? 'Доставка' : 'Самовывоз'}
            </span>
          </div>
          {lastOrder.address && (
            <div className="flex justify-between gap-2">
              <span className="text-[#52525B]">Адрес:</span>
              <span className="font-medium text-right break-words max-w-[65%]">
                {lastOrder.address}
              </span>
            </div>
          )}
          <div className="flex justify-between gap-2">
            <span className="text-[#52525B]">Время:</span>
            <span className="font-medium text-right">{lastOrder.preferredTime}</span>
          </div>
          <div className="flex justify-between gap-2 pt-2 border-t border-[#15803D]/15 font-bold">
            <span>Сумма блюд:</span>
            <span className="tabular-nums">
              {lastOrder.totalAmount.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetConfirmation}
          className="w-full min-h-[44px] px-4 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#FAF9F6] text-sm font-semibold text-[#18181B] transition-colors cursor-pointer"
        >
          Оформить новый заказ
        </button>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Добавьте хотя бы одно блюдо в корзину перед оформлением.');
      return;
    }
    if (!customerName.trim()) {
      setError('Укажите ваше имя.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setError('Введите корректный номер телефона для связи.');
      return;
    }
    if (deliveryMethod === 'delivery' && !address.trim()) {
      setError('Укажите адрес доставки или выберите самовывоз.');
      return;
    }

    setError(null);
    onSubmitOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryMethod,
      address: deliveryMethod === 'delivery' ? address.trim() : undefined,
      preferredTime,
      paymentMethod,
      comment: comment.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Delivery vs Pickup Switch */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F0EFEA]">
        <button
          type="button"
          onClick={() => setDeliveryMethod('delivery')}
          className={`min-h-[44px] px-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            deliveryMethod === 'delivery'
              ? 'bg-[#FFD147] text-[#18181B] shadow-xs'
              : 'text-[#52525B] hover:text-[#18181B]'
          }`}
        >
          Доставка
        </button>
        <button
          type="button"
          onClick={() => setDeliveryMethod('pickup')}
          className={`min-h-[44px] px-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            deliveryMethod === 'pickup'
              ? 'bg-[#FFD147] text-[#18181B] shadow-xs'
              : 'text-[#52525B] hover:text-[#18181B]'
          }`}
        >
          Самовывоз
        </button>
      </div>

      {items.length === 0 && (
        <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#FDE68A] text-sm text-[#18181B] flex flex-wrap items-center justify-between gap-2">
          <span>Корзина пока пуста — выберите блюда из меню.</span>
          {onGoToMenu && (
            <button
              type="button"
              onClick={onGoToMenu}
              className="min-h-[44px] px-4 rounded-lg bg-white border border-[#E7E5E0] text-xs font-semibold text-[#18181B] hover:bg-[#FAF9F6] cursor-pointer"
            >
              К меню
            </button>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
            Выбранные блюда
          </div>
          <ul className="space-y-1.5 text-sm">
            {items.map((item) => (
              <li key={item.key} className="flex justify-between gap-3">
                <span className="text-[#18181B] min-w-0 truncate">
                  {item.dish.name}{' '}
                  <span className="text-[#52525B] tabular-nums">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-[#18181B] tabular-nums shrink-0">
                  {(getCartItemUnitPrice(item) * item.quantity).toLocaleString('ru-RU')} ₽
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label
            htmlFor="checkout-name"
            className="block text-xs font-semibold text-[#52525B] mb-1.5"
          >
            Имя *
          </label>
          <input
            id="checkout-name"
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Например, Анна"
            className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#E7E5E0] bg-white text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D62839]"
          />
        </div>

        <div>
          <label
            htmlFor="checkout-phone"
            className="block text-xs font-semibold text-[#52525B] mb-1.5"
          >
            Телефон *
          </label>
          <input
            id="checkout-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#E7E5E0] bg-white text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D62839]"
          />
        </div>
      </div>

      {deliveryMethod === 'delivery' && (
        <div>
          <label
            htmlFor="checkout-address"
            className="block text-xs font-semibold text-[#52525B] mb-1.5"
          >
            Адрес доставки *
          </label>
          <input
            id="checkout-address"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Улица, дом, подъезд, квартира"
            className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#E7E5E0] bg-white text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D62839]"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label
            htmlFor="checkout-time"
            className="block text-xs font-semibold text-[#52525B] mb-1.5"
          >
            Удобное время
          </label>
          <select
            id="checkout-time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full min-h-[44px] px-3 rounded-xl border border-[#E7E5E0] bg-white text-sm text-[#18181B] focus:outline-none focus:border-[#D62839]"
          >
            <option value="Как можно скорее">Как можно скорее</option>
            <option value="Через 1 час">Через 1 час</option>
            <option value="К обеду (13:00–14:00)">К обеду (13:00–14:00)</option>
            <option value="К ужину (19:00–20:00)">К ужину (19:00–20:00)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="checkout-payment"
            className="block text-xs font-semibold text-[#52525B] mb-1.5"
          >
            Способ оплаты
          </label>
          <select
            id="checkout-payment"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="w-full min-h-[44px] px-3 rounded-xl border border-[#E7E5E0] bg-white text-sm text-[#18181B] focus:outline-none focus:border-[#D62839]"
          >
            <option value="card">Картой при получении</option>
            <option value="cash">Наличными при получении</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="checkout-comment"
          className="block text-xs font-semibold text-[#52525B] mb-1.5"
        >
          Комментарий к заказу
        </label>
        <textarea
          id="checkout-comment"
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Пожелания по приготовлению, приборы, код домофона..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D62839] resize-y"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="text-sm font-medium text-[#B91C1C] bg-[#FEE2E2]/70 border border-[#FCA5A5] rounded-xl px-3.5 py-2.5"
        >
          {error}
        </p>
      )}

      <div className="pt-2 border-t border-[#E7E5E0] space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-[#52525B]">Итого за блюда</span>
          <span className="text-xl font-bold text-[#18181B] tabular-nums">
            {totalAmount.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        {deliveryMethod === 'delivery' && (
          <p className="text-xs text-[#52525B] leading-relaxed">
            Стоимость доставки рассчитывается отдельно в зависимости от зоны и
            подтверждается оператором до отправки курьера.
          </p>
        )}

        <button
          type="submit"
          className="w-full min-h-[48px] px-6 rounded-xl bg-[#D62839] hover:bg-[#B81D2C] text-sm sm:text-base font-semibold text-white transition-colors cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </form>
  );
}
