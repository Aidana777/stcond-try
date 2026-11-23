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

  const tagColor =
    dish.tag === 'Вегетарианское'
      ? 'text-[#15803D]'
      : dish.tag === 'Комбо'
      ? 'text-[#B45309]'
      : 'text-[#D62839]';

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#E7E5E0] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#D62839]/30 min-w-0">
      <button
        type="button"
        onClick={() => onSelectDish(dish)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0EFEA] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D62839]"
        aria-label={`Подробнее о блюде ${dish.name}`}
      >
        {!imgError ? (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FFF1F2] to-[#FEF3C7] text-[#52525B]">
            <Utensils className="w-8 h-8 mb-2 text-[#D62839]" aria-hidden="true" />
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
              <span className={`font-semibold ${tagColor}`}>{dish.tag}</span>
            </>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onSelectDish(dish)}
            className="text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62839]"
          >
            <h3 className="text-base sm:text-lg font-semibold text-[#18181B] leading-snug group-hover:text-[#D62839] transition-colors">
              {dish.name}
            </h3>
          </button>
          <p className="mt-1.5 text-sm text-[#52525B] leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F0EFEA] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-lg sm:text-xl font-bold text-[#18181B] tabular-nums whitespace-nowrap">
              {dish.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={() => onQuickAdd(dish)}
              className="min-h-[44px] px-4 sm:px-5 inline-flex items-center justify-center rounded-xl bg-[#D62839] hover:bg-[#B81D2C] text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              В корзину
            </button>
          ) : (
            <div className="inline-flex items-center rounded-xl border border-[#FFD147] bg-[#FFD147] shrink-0">
              <button
                type="button"
                onClick={() => onDecrementSimple(dish)}
                aria-label={`Уменьшить количество ${dish.name}`}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#18181B] hover:bg-black/5 rounded-l-xl transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span
                aria-live="polite"
                className="min-w-[28px] text-center text-sm font-bold text-[#18181B] tabular-nums"
              >
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={() => onQuickAdd(dish)}
                aria-label={`Увеличить количество ${dish.name}`}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#18181B] hover:bg-black/5 rounded-r-xl transition-colors cursor-pointer"
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
