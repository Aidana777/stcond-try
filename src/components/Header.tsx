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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#18181B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D62839]"
        >
          Бистро <span className="italic text-[#D62839]">Сезон</span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Основная навигация"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#52525B]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#D62839] transition-colors whitespace-nowrap shrink-0 py-1 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart & Order CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Открыть корзину, товаров: ${cartCount}`}
            className={`min-h-[44px] px-3 sm:px-4 inline-flex items-center gap-2 rounded-xl border text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              cartCount > 0
                ? 'border-[#FFD147] bg-[#FFD147] text-[#18181B] hover:bg-[#F5C431]'
                : 'border-[#E7E5E0] bg-[#FAF9F6] text-[#18181B] hover:bg-[#F0EFEA]'
            }`}
          >
            <ShoppingBag
              className={`w-4 h-4 shrink-0 ${
                cartCount > 0 ? 'text-[#18181B]' : 'text-[#D62839]'
              }`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Корзина</span>
            <span className="tabular-nums font-bold">{cartCount}</span>
            {cartTotal > 0 && (
              <span className="hidden md:inline text-xs font-semibold tabular-nums border-l border-[#18181B]/20 pl-2">
                {cartTotal.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </button>

          <a
            href="#order"
            className="hidden sm:inline-flex min-h-[44px] px-5 items-center justify-center rounded-xl bg-[#D62839] hover:bg-[#B81D2C] text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0"
          >
            Заказать
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[#E7E5E0] text-[#18181B] hover:bg-[#F0EFEA] transition-colors cursor-pointer shrink-0"
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
        <div className="lg:hidden border-t border-[#E7E5E0] bg-white px-4 py-4 space-y-1 shadow-lg">
          <nav aria-label="Мобильное меню" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-xl text-base font-medium text-[#18181B] hover:bg-[#FAF9F6] hover:text-[#D62839] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E7E5E0]">
            <a
              href="#order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] flex items-center justify-center rounded-xl bg-[#D62839] hover:bg-[#B81D2C] text-sm font-semibold text-white transition-colors"
            >
              Заказать сейчас
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
