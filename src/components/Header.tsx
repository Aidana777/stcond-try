import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { href: '#menu', label: 'Меню' },
  { href: '#about', label: 'О нас' },
  { href: '#featured', label: 'Акции' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#contacts', label: 'Контакты' },
];

export function Header({ cartCount, cartTotal, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#18181B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D]"
        >
          Бистро Сезон
        </a>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="Основная навигация"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#52525B]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#18181B] transition-colors whitespace-nowrap shrink-0 py-1 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart & Order Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Открыть корзину, товаров: ${cartCount}`}
            className="min-h-[44px] px-3 sm:px-4 inline-flex items-center gap-2 rounded-lg border border-[#E5E5E2] bg-[#F8F8F7] hover:bg-[#F2F2F0] text-sm font-medium text-[#18181B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Корзина</span>
            <span className="tabular-nums font-semibold text-[#15803D]">
              {cartCount}
            </span>
            {cartTotal > 0 && (
              <span className="hidden md:inline text-xs text-[#52525B] tabular-nums border-l border-[#E5E5E2] pl-2">
                {cartTotal.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </button>

          <a
            href="#order"
            className="hidden sm:inline-flex min-h-[44px] px-5 items-center justify-center rounded-lg bg-[#15803D] hover:bg-[#166534] text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
          >
            Заказать
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[#E5E5E2] text-[#18181B] hover:bg-[#F2F2F0] transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E2] bg-white px-4 py-4 space-y-1 shadow-lg">
          <nav aria-label="Мобильное меню" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-lg text-base font-medium text-[#18181B] hover:bg-[#F2F2F0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E5E5E2]">
            <a
              href="#order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] flex items-center justify-center rounded-lg bg-[#15803D] hover:bg-[#166534] text-sm font-semibold text-white transition-colors"
            >
              Заказать сейчас
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
