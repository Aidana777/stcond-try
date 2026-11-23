import {
  ArrowRight,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  Utensils,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { DishCard } from './components/DishCard';
import { DishModal } from './components/DishModal';
import { Header } from './components/Header';
import {
  ADVANTAGES,
  CATEGORIES,
  CategoryId,
  DISHES,
  Dish,
  DishAddon,
  FAQ_ITEMS,
  ORDER_STEPS,
  SAMPLE_REVIEWS,
} from './data/menuData';
import {
  CartItem,
  OrderSubmission,
  buildCartKey,
  getCartItemUnitPrice,
} from './types/cart';

const HIGHLIGHT_CATEGORIES: CategoryId[] = [
  'breakfast',
  'salads',
  'mains',
  'desserts',
  'drinks',
  'combo',
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderSubmission | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [kitchenImgError, setKitchenImgError] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const featuredDishes = useMemo(
    () => DISHES.filter((dish) => dish.isFeatured).slice(0, 3),
    []
  );

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return DISHES;
    return DISHES.filter((dish) => dish.category === activeCategory);
  }, [activeCategory]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + getCartItemUnitPrice(item) * item.quantity,
        0
      ),
    [cartItems]
  );

  const getDishSimpleQuantity = (dishId: string) => {
    return cartItems
      .filter((item) => item.dish.id === dishId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleAddToCart = (
    dish: Dish,
    addons: DishAddon[] = [],
    quantity = 1
  ) => {
    setLastOrder(null);
    const key = buildCartKey(dish.id, addons);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { key, dish, selectedAddons: addons, quantity }];
    });
  };

  const handleDecrementSimple = (dish: Dish) => {
    setCartItems((prev) => {
      const target = [...prev].reverse().find((item) => item.dish.id === dish.id);
      if (!target) return prev;
      if (target.quantity <= 1) {
        return prev.filter((item) => item.key !== target.key);
      }
      return prev.map((item) =>
        item.key === target.key
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmitOrder = (
    data: Omit<OrderSubmission, 'orderNumber' | 'items' | 'totalAmount'>
  ) => {
    const orderNumber = String(Math.floor(1000 + Math.random() * 9000));
    setLastOrder({
      ...data,
      orderNumber,
      items: cartItems,
      totalAmount: cartTotal,
    });
    setCartItems([]);
  };

  const handleSelectCategoryShortcut = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F7] text-[#18181B]">
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="bg-white border-b border-[#E5E5E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-[#15803D] tracking-wide">
                  Кухня и онлайн-заказ · Доставка и самовывоз
                </p>
                <h1 className="mt-3 font-display text-[2rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.35rem] lg:leading-[1.08] font-bold text-[#18181B] text-balance">
                  Вкусные блюда — с доставкой к вашему столу
                </h1>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
                  Выбирайте любимые блюда из меню, оформляйте заказ онлайн и
                  наслаждайтесь вкусом без лишних хлопот.
                </p>

                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="#menu"
                    className="min-h-[48px] px-6 rounded-lg bg-[#15803D] hover:bg-[#166534] text-sm sm:text-base font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Посмотреть меню</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href="#order"
                    className="min-h-[48px] px-6 rounded-lg border border-[#E5E5E2] bg-white hover:bg-[#F2F2F0] text-sm sm:text-base font-semibold text-[#18181B] inline-flex items-center justify-center transition-colors whitespace-nowrap"
                  >
                    Заказать сейчас
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 min-w-0">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[400px] w-full rounded-2xl overflow-hidden bg-[#F2F2F0] border border-[#E5E5E2]">
                  {!heroImgError ? (
                    <img
                      src="/src/assets/images/hero_bistro_table_1795441588925.jpg"
                      alt="Сервированный стол со свежими блюдами бистро"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#52525B]">
                      <Utensils className="w-10 h-10 mb-2 text-[#15803D]" aria-hidden="true" />
                      <span className="text-sm font-medium">
                        Свежие блюда бистро «Сезон»
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Quick Categories & Featured Recommendations */}
        <section id="featured" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            {/* Categories Overview */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                    Категории меню
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-[#52525B]">
                    Нажмите на раздел, чтобы сразу перейти к подборке блюд.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {CATEGORIES.filter((cat) =>
                  HIGHLIGHT_CATEGORIES.includes(cat.id)
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategoryShortcut(cat.id)}
                    className={`min-h-[84px] p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'border-[#15803D] bg-white shadow-xs'
                        : 'border-[#E5E5E2] bg-white hover:border-[#18181B]/30'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#18181B] leading-snug">
                      {cat.label}
                    </span>
                    <span className="mt-1.5 text-xs text-[#52525B] line-clamp-2">
                      {cat.shortDesc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular / Recommended Dishes */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
                    Наши рекомендации
                  </p>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                    Популярные блюда и комбо
                  </h2>
                </div>
                <a
                  href="#menu"
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D] hover:underline self-start sm:self-auto"
                >
                  <span>Смотреть всё меню</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {featuredDishes.map((dish) => (
                  <DishCard
                    key={`featured-${dish.id}`}
                    dish={dish}
                    quantityInCart={getDishSimpleQuantity(dish.id)}
                    onSelectDish={setSelectedDish}
                    onQuickAdd={(d) => handleAddToCart(d)}
                    onDecrementSimple={handleDecrementSimple}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Full Interactive Menu */}
        <section
          id="menu"
          className="py-12 sm:py-16 lg:py-20 bg-white border-y border-[#E5E5E2]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18181B]">
                  Меню заведения
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-[#52525B]">
                  Нажмите на любое блюдо, чтобы увидеть подробный состав, аллергены и
                  добавки.
                </p>
              </div>
              <div className="text-xs sm:text-sm text-[#52525B] tabular-nums">
                Показано блюд: {filteredDishes.length}
              </div>
            </div>

            {/* Horizontally Scrollable Category Filter Tabs (zero horizontal page overflow) */}
            <div
              role="tablist"
              aria-label="Фильтр меню по категориям"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 border-b border-[#E5E5E2]"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category.id)}
                    className={`min-h-[44px] px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#18181B] text-white'
                        : 'bg-[#F8F8F7] text-[#52525B] hover:text-[#18181B] hover:bg-[#F2F2F0]'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Dish Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  quantityInCart={getDishSimpleQuantity(dish.id)}
                  onSelectDish={setSelectedDish}
                  onQuickAdd={(d) => handleAddToCart(d)}
                  onDecrementSimple={handleDecrementSimple}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. How to Order + About Us + Advantages */}
        <section id="about" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
            {/* How to Order */}
            <div>
              <div className="max-w-2xl mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                  Как оформить заказ
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#52525B]">
                  Оформление заказа занимает пару минут — от выбора блюд до
                  подтверждения.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {ORDER_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-xl bg-white border border-[#E5E5E2] flex flex-col gap-2"
                  >
                    <span className="text-xs font-bold text-[#15803D] tabular-nums">
                      Шаг {item.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[#18181B]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#52525B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* About Us + Kitchen Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 min-w-0">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[380px] rounded-2xl overflow-hidden bg-[#F2F2F0] border border-[#E5E5E2]">
                  {!kitchenImgError ? (
                    <img
                      src="/src/assets/images/about_bistro_kitchen_1795441583293.jpg"
                      alt="Повара на открытой кухне бистро за приготовлением блюд"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setKitchenImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-[#52525B]">
                      <Utensils className="w-10 h-10 text-[#15803D]" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center space-y-6 min-w-0">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#15803D]">
                    О кухне
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                    Открытая кухня и понятные рецепты на каждый день
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed">
                    Мы готовим без лишних усложнений: свежие овощи, домашняя паста,
                    бульоны долгого томления и выпечка на закваске. Каждое блюдо
                    собирается под ваш заказ, чтобы сохранить вкус и текстуру в
                    дороге.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E5E5E2]">
                  {ADVANTAGES.map((adv) => (
                    <div key={adv.title} className="space-y-1">
                      <h3 className="text-sm sm:text-base font-semibold text-[#18181B]">
                        {adv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sample Reviews & FAQ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-[#E5E5E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
            {/* Reviews */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                    Отзывы гостей
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
                    Временные примеры карточек для дизайна (подключаются реальные
                    отзывы заведения).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {SAMPLE_REVIEWS.map((review) => (
                  <article
                    key={review.id}
                    className="p-5 rounded-xl bg-[#F8F8F7] border border-[#E5E5E2] flex flex-col justify-between gap-4"
                  >
                    <p className="text-sm text-[#18181B] leading-relaxed">
                      «{review.text}»
                    </p>
                    <div className="pt-3 border-t border-[#E5E5E2] flex items-center justify-between gap-2 text-xs text-[#52525B]">
                      <span className="font-semibold text-[#18181B]">
                        {review.author}
                      </span>
                      <span className="truncate">{review.dish}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div id="faq" className="max-w-3xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] mb-6">
                Частые вопросы
              </h2>

              <div className="divide-y divide-[#E5E5E2] border-y border-[#E5E5E2]">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={item.q}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full min-h-[52px] py-3.5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#18181B] hover:text-[#15803D] transition-colors cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 text-[#52525B] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <div className="pb-4 pr-6 text-sm text-[#52525B] leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Delivery, Contacts & On-page Order Form */}
        <section id="delivery" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Delivery & Contacts Info */}
              <div id="contacts" className="lg:col-span-5 space-y-6 min-w-0">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                    Доставка и контакты
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#52525B] leading-relaxed">
                    Оформляйте доставку курьером или забирайте готовый заказ
                    самостоятельно из зала бистро.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E5E5E2] space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock
                      className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-[#18181B]">
                        Часы работы кухни
                      </h3>
                      <p className="text-sm text-[#52525B] mt-0.5">
                        Ежедневно (точное время приёма заказов уточняется при запуске)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-[#18181B]">
                        Самовывоз и адрес
                      </h3>
                      <p className="text-sm text-[#52525B] mt-0.5">
                        Адрес заведения и зоны доставки указываются перед публикацией
                        проекта.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-[#18181B]">
                        Телефон для связи
                      </h3>
                      <p className="text-sm text-[#52525B] mt-0.5">
                        Подтверждаем каждый онлайн-заказ звонком оператора.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* On-Page Checkout Module */}
              <div
                id="order"
                className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-white border border-[#E5E5E2] min-w-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E5E5E2]">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#18181B]">
                      Оформление заказа
                    </h2>
                    <p className="text-xs sm:text-sm text-[#52525B] mt-0.5">
                      Укажите контакты и выберите доставку или самовывоз.
                    </p>
                  </div>
                  {cartCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(true)}
                      className="min-h-[44px] px-3.5 rounded-lg border border-[#E5E5E2] bg-[#F8F8F7] hover:bg-[#F2F2F0] text-xs font-semibold text-[#18181B] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                      <span>Изменить корзину ({cartCount})</span>
                    </button>
                  )}
                </div>

                <CheckoutForm
                  items={cartItems}
                  totalAmount={cartTotal}
                  lastOrder={lastOrder}
                  onSubmitOrder={handleSubmitOrder}
                  onResetConfirmation={() => setLastOrder(null)}
                  onGoToMenu={() => {
                    document
                      .getElementById('menu')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E5E2] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#52525B]">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-[#18181B]">
              Бистро Сезон
            </span>
            <span aria-hidden="true">·</span>
            <span>Меню и онлайн-заказ</span>
          </div>
          <nav
            aria-label="Навигация в подвале"
            className="flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            <a href="#menu" className="hover:text-[#18181B] min-h-[44px] inline-flex items-center px-1">
              Меню
            </a>
            <a href="#about" className="hover:text-[#18181B] min-h-[44px] inline-flex items-center px-1">
              О нас
            </a>
            <a href="#faq" className="hover:text-[#18181B] min-h-[44px] inline-flex items-center px-1">
              FAQ
            </a>
            <a href="#delivery" className="hover:text-[#18181B] min-h-[44px] inline-flex items-center px-1">
              Доставка
            </a>
            <a href="#order" className="hover:text-[#18181B] min-h-[44px] inline-flex items-center px-1">
              Заказать
            </a>
          </nav>
        </div>
      </footer>

      {/* Dish Detail Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        totalAmount={cartTotal}
        lastOrder={lastOrder}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onSubmitOrder={handleSubmitOrder}
        onResetConfirmation={() => setLastOrder(null)}
      />
    </div>
  );
}
