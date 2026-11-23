import { Minus, Plus, Utensils } from 'lucide-react';
import { useState } from 'react';
import { Dish } from '../data/menuData';

interface DishCardProps {
  dish: Dish;
  quantityInCart: number;
  onSelectDish: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
  onDecrementSimple: (dish: Dish) => void;
}

export function DishCard({
  dish,
  quantityInCart,
  onSelectDish,
  onQuickAdd,
  onDecrementSimple,
}: DishCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-[#E5E5E2] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-w-0">
      <button
        type="button"
        onClick={() => onSelectDish(dish)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2F2F0] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#15803D]"
        aria-label={`Подробнее о блюде ${dish.name}`}
      >
        {!imgError ? (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#F2F2F0] to-[#E5E5E2] text-[#52525B]">
            <Utensils className="w-8 h-8 mb-2 text-[#15803D]" aria-hidden="true" />
            <span className="text-sm font-medium">{dish.name}</span>
          </div>
        )}
      </button>

      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3 min-w-0">
        {/* Clean unboxed typographic metadata (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#52525B]">
          <span>{dish.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{dish.weight}</span>
          {dish.tag && (
            <>
              <span aria-hidden="true">·</span>
              <span
                className={
                  dish.tag === 'Острое'
                    ? 'font-semibold text-[#B91C1C]'
                    : 'font-semibold text-[#15803D]'
                }
              >
                {dish.tag}
              </span>
            </>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onSelectDish(dish)}
            className="text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#15803D]"
          >
            <h3 className="text-base sm:text-lg font-semibold text-[#18181B] leading-snug group-hover:text-[#15803D] transition-colors">
              {dish.name}
            </h3>
          </button>
          <p className="mt-1.5 text-sm text-[#52525B] leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F2F2F0] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-base sm:text-lg font-bold text-[#18181B] tabular-nums whitespace-nowrap">
              {dish.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={() => onQuickAdd(dish)}
              className="min-h-[44px] px-4 sm:px-5 inline-flex items-center justify-center rounded-lg bg-[#18181B] hover:bg-[#15803D] text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              В корзину
            </button>
          ) : (
            <div className="inline-flex items-center rounded-lg border border-[#E5E5E2] bg-[#F8F8F7] shrink-0">
              <button
                type="button"
                onClick={() => onDecrementSimple(dish)}
                aria-label={`Уменьшить количество ${dish.name}`}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#18181B] hover:bg-[#E5E5E2]/60 rounded-l-lg transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span
                aria-live="polite"
                className="min-w-[28px] text-center text-sm font-semibold text-[#18181B] tabular-nums"
              >
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={() => onQuickAdd(dish)}
                aria-label={`Увеличить количество ${dish.name}`}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#18181B] hover:bg-[#E5E5E2]/60 rounded-r-lg transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
