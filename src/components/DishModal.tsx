import { Check, Minus, Plus, Utensils, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dish, DishAddon } from '../data/menuData';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, addons: DishAddon[], quantity: number) => void;
}

export function DishModal({ dish, onClose, onAddToCart }: DishModalProps) {
  const [selectedAddons, setSelectedAddons] = useState<DishAddon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setSelectedAddons([]);
    setQuantity(1);
    setImgError(false);
  }, [dish?.id]);

  useEffect(() => {
    if (!dish) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  if (!dish) return null;

  const toggleAddon = (addon: DishAddon) => {
    setSelectedAddons((prev) =>
      prev.some((item) => item.id === addon.id)
        ? prev.filter((item) => item.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonsSum = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalUnit = dish.price + addonsSum;
  const totalPrice = totalUnit * quantity;

  const handleSubmit = () => {
    onAddToCart(dish, selectedAddons, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image + Close Button */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#F2F2F0] shrink-0">
          {!imgError ? (
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#52525B]">
              <Utensils className="w-10 h-10 text-[#15803D]" aria-hidden="true" />
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть карточку блюда"
            className="absolute top-3 right-3 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full bg-white/95 text-[#18181B] shadow-md hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B] mb-1.5">
              <span>{dish.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Порция: {dish.weight}</span>
              {dish.tag && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#15803D]">{dish.tag}</span>
                </>
              )}
            </div>
            <h2
              id="dish-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] leading-tight"
            >
              {dish.name}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#52525B] leading-relaxed">
              {dish.description}
            </p>
          </div>

          <div className="pt-4 border-t border-[#E5E5E2] space-y-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                Состав
              </h3>
              <p className="mt-1 text-sm text-[#18181B] leading-relaxed">
                {dish.ingredients}
              </p>
            </div>
            {dish.allergens && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
                  Аллергены
                </h3>
                <p className="mt-1 text-sm text-[#18181B]">{dish.allergens}</p>
              </div>
            )}
          </div>

          {dish.addons && dish.addons.length > 0 && (
            <div className="pt-4 border-t border-[#E5E5E2]">
              <h3 className="text-sm font-semibold text-[#18181B] mb-2.5">
                Дополнения к блюду
              </h3>
              <div className="space-y-2">
                {dish.addons.map((addon) => {
                  const checked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      aria-pressed={checked}
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                        checked
                          ? 'border-[#15803D] bg-[#15803D]/5 text-[#18181B]'
                          : 'border-[#E5E5E2] hover:bg-[#F8F8F7] text-[#18181B]'
                      }`}
                    >
                      <span className="flex items-center gap-3 text-sm font-medium min-w-0 flex-1">
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                            checked
                              ? 'bg-[#15803D] border-[#15803D] text-white'
                              : 'border-[#D4D4D8] bg-white'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        </span>
                        <span className="truncate">{addon.name}</span>
                      </span>
                      <span className="text-sm font-semibold tabular-nums whitespace-nowrap shrink-0 text-[#52525B]">
                        {addon.price > 0 ? `+${addon.price} ₽` : 'Бесплатно'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Modal Footer */}
        <div className="p-4 sm:px-6 border-t border-[#E5E5E2] bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="inline-flex items-center justify-between sm:justify-start rounded-lg border border-[#E5E5E2] bg-[#F8F8F7]">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Уменьшить количество"
              className="min-w-[44px] min-h-[48px] inline-flex items-center justify-center text-[#18181B] hover:bg-[#E5E5E2]/60 rounded-l-lg cursor-pointer"
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="min-w-[40px] text-center text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Увеличить количество"
              className="min-w-[44px] min-h-[48px] inline-flex items-center justify-center text-[#18181B] hover:bg-[#E5E5E2]/60 rounded-r-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 min-h-[48px] px-6 rounded-lg bg-[#15803D] hover:bg-[#166534] text-sm sm:text-base font-semibold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Добавить в корзину</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </button>
        </div>
      </div>
    </div>
  );
}
