export type CategoryId =
  | 'all'
  | 'breakfast'
  | 'starters'
  | 'salads'
  | 'soups'
  | 'mains'
  | 'pasta'
  | 'desserts'
  | 'drinks'
  | 'combo';

export interface Category {
  id: CategoryId;
  label: string;
  shortDesc: string;
}

export interface DishAddon {
  id: string;
  name: string;
  price: number;
}

export type DishTag = 'Популярное' | 'Новинка' | 'Вегетарианское' | 'Острое' | 'Комбо';

export interface Dish {
  id: string;
  name: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  description: string;
  ingredients: string;
  allergens?: string;
  price: number;
  weight: string;
  image: string;
  tag?: DishTag;
  isFeatured?: boolean;
  addons?: DishAddon[];
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Все блюда', shortDesc: 'Полное меню кухни' },
  { id: 'breakfast', label: 'Завтраки', shortDesc: 'Вкусное начало дня' },
  { id: 'starters', label: 'Закуски', shortDesc: 'К столу и в компанию' },
  { id: 'salads', label: 'Салаты', shortDesc: 'Свежие ингредиенты и сочетания' },
  { id: 'soups', label: 'Супы', shortDesc: 'Тёплые и насыщенные' },
  { id: 'mains', label: 'Основные блюда', shortDesc: 'Сытные блюда на обед или ужин' },
  { id: 'pasta', label: 'Паста и пицца', shortDesc: 'Ручная работа и печь' },
  { id: 'desserts', label: 'Десерты', shortDesc: 'Сладкое завершение трапезы' },
  { id: 'drinks', label: 'Напитки', shortDesc: 'Напитки на любой вкус' },
  { id: 'combo', label: 'Комбо', shortDesc: 'Выгодные наборы' },
];

export const DISHES: Dish[] = [
  {
    id: 'avocado-poached-breakfast',
    name: 'Тост с авокадо и яйцом пашот',
    category: 'breakfast',
    categoryLabel: 'Завтраки',
    description: 'Хрустящий ремесленный хлеб на закваске со спелым авокадо, яйцами пашот и запечёнными томатами черри.',
    ingredients: 'Хлеб на закваске, авокадо, фермерские яйца, томаты черри, микрозелень, оливковое масло, морская соль',
    allergens: 'Глютен, яйца',
    price: 540,
    weight: '290 г',
    image: '/src/assets/images/dish_breakfast_bowl_1795441581461.jpg',
    tag: 'Популярное',
    isFeatured: true,
    addons: [
      { id: 'salmon-add', name: 'Слабосолёный лосось (50 г)', price: 220 },
      { id: 'feta-add', name: 'Сыр фета (40 г)', price: 110 },
      { id: 'extra-egg', name: 'Дополнительное яйцо пашот', price: 80 },
    ],
  },
  {
    id: 'burrata-heirloom-salad',
    name: 'Буррата с томатами и базиликом',
    category: 'salads',
    categoryLabel: 'Салаты',
    description: 'Сливочная буррата со спелыми разноцветными томатами, зелёным маслом и обжаренным кедровым орехом.',
    ingredients: 'Сыр буррата, томаты нескольких сортов, свежий базилик, кедровые орехи, масло базилика, бальзамик',
    allergens: 'Молочные продукты, орехи',
    price: 690,
    weight: '260 г',
    image: '/src/assets/images/dish_burrata_salad_1795441580912.jpg',
    tag: 'Популярное',
    isFeatured: true,
    addons: [
      { id: 'sourdough-slice', name: 'Тёплый хлеб на закваске (2 ломтика)', price: 90 },
      { id: 'extra-pine', name: 'Дополнительные кедровые орехи', price: 120 },
    ],
  },
  {
    id: 'pumpkin-ginger-soup',
    name: 'Крем-суп из запечённой тыквы',
    category: 'soups',
    categoryLabel: 'Супы',
    description: 'Бархатный суп из сладкой тыквы с ноткой имбиря, сливками, тыквенными семечками и тимьяном.',
    ingredients: 'Тыква баттернат, корень имбиря, сливки 20%, овощной бульон, тыквенные семечки, тимьян',
    allergens: 'Молочные продукты',
    price: 460,
    weight: '320 мл',
    image: '/src/assets/images/dish_cream_soup_1795441580607.jpg',
    tag: 'Вегетарианское',
    addons: [
      { id: 'garlic-croutons', name: 'Чесночные гренки', price: 70 },
      { id: 'crispy-bacon', name: 'Хрустящий бекон (30 г)', price: 130 },
    ],
  },
  {
    id: 'seared-salmon-asparagus',
    name: 'Стейк лосося со спаржей',
    category: 'mains',
    categoryLabel: 'Основные блюда',
    description: 'Филе лосося с хрустящей корочкой, обжаренной зелёной спаржей, молодым картофелем и лимонным соусом.',
    ingredients: 'Филе лосося, зелёная спаржа, беби-картофель, лимон, сливочно-травяная эмульсия, укроп',
    allergens: 'Рыба, молочные продукты',
    price: 1180,
    weight: '340 г',
    image: '/src/assets/images/dish_grilled_salmon_1795441581416.jpg',
    tag: 'Популярное',
    isFeatured: true,
    addons: [
      { id: 'extra-asparagus', name: 'Двойная порция спаржи', price: 190 },
      { id: 'hollandaise', name: 'Соус голландский (40 г)', price: 95 },
    ],
  },
  {
    id: 'wild-mushroom-tagliatelle',
    name: 'Тальятелле с лесными грибами',
    category: 'pasta',
    categoryLabel: 'Паста и пицца',
    description: 'Домашняя яичная паста с обжаренными белыми грибами, шампиньонами, выдержанным пармезаном и чёрным перцем.',
    ingredients: 'Паста тальятелле, белые грибы, шампиньоны, пармезан, сливочное масло, чеснок, петрушка',
    allergens: 'Глютен, яйца, молочные продукты',
    price: 760,
    weight: '310 г',
    image: '/src/assets/images/dish_truffle_pasta_1795441580658.jpg',
    tag: 'Новинка',
    isFeatured: true,
    addons: [
      { id: 'truffle-oil', name: 'Трюфельное масло', price: 110 },
      { id: 'extra-parmesan', name: 'Дополнительный пармезан (25 г)', price: 100 },
    ],
  },
  {
    id: 'almond-berry-tart',
    name: 'Миндальная тарталетка с ягодами',
    category: 'desserts',
    categoryLabel: 'Десерты',
    description: 'Песочная основа с миндальным кремом, нежным муссом маскарпоне, свежей малиной и голубикой.',
    ingredients: 'Миндальная мука, сливочное масло, сыр маскарпоне, свежая малина, голубика, мята',
    allergens: 'Орехи, глютен, молочные продукты, яйца',
    price: 420,
    weight: '150 г',
    image: '/src/assets/images/dish_berry_dessert_1795441580752.jpg',
    tag: 'Новинка',
    addons: [
      { id: 'vanilla-sauce', name: 'Ванильный соус (30 г)', price: 65 },
    ],
  },
  {
    id: 'citrus-basil-lemonade',
    name: 'Домашний лимонад грейпфрут-базилик',
    category: 'drinks',
    categoryLabel: 'Напитки',
    description: 'Освежающий авторский лимонад на свежевыжатом соке розового грейпфрута, лайма и листьях зелёного базилика.',
    ingredients: 'Розовый грейпфрут, сок лайма, свежий базилик, тростниковый сироп, газированная вода',
    price: 310,
    weight: '400 мл',
    image: '/src/assets/images/dish_craft_lemonade_1795441581624.jpg',
    tag: 'Вегетарианское',
    addons: [
      { id: 'no-ice', name: 'Без льда', price: 0 },
      { id: 'bottle-1l', name: 'Бутылка 1 литр для компании', price: 380 },
    ],
  },
  {
    id: 'artisan-bread-olives',
    name: 'Тёплый хлеб, взбитое масло и оливки',
    category: 'starters',
    categoryLabel: 'Закуски',
    description: 'Свежеиспечённый хлеб на закваске с морской солью, нежным сливочным маслом и маринованными оливками.',
    ingredients: 'Пшенично-ржаной хлеб, сливочное масло, оливки каламата, розмарин, оливковое масло',
    allergens: 'Глютен, молочные продукты',
    price: 360,
    weight: '220 г',
    image: '/src/assets/images/hero_bistro_table_1795441588925.jpg',
    tag: 'Вегетарианское',
  },
  {
    id: 'lunch-combo-bistro',
    name: 'Обеденный сет «Сезон»',
    category: 'combo',
    categoryLabel: 'Комбо',
    description: 'Тыквенный крем-суп, тальятелле с лесными грибами и домашний цитрусовый лимонад по специальной цене.',
    ingredients: 'Крем-суп из тыквы (250 мл), тальятелле с грибами (260 г), лимонад грейпфрут-базилик (300 мл)',
    allergens: 'Глютен, яйца, молочные продукты',
    price: 1290,
    weight: '810 г',
    image: '/src/assets/images/hero_bistro_table_1795441588925.jpg',
    tag: 'Комбо',
    isFeatured: true,
  },
  {
    id: 'spicy-tomato-pasta',
    name: 'Острая паста с томатами и страчателлой',
    category: 'pasta',
    categoryLabel: 'Паста и пицца',
    description: 'Тальятелле в соусе из сладких томатов с перцем чили, чесноком и прохладным сливочным сыром.',
    ingredients: 'Домашняя паста, томаты пилати, перец чили, сыр страчателла, базилик, оливковое масло',
    allergens: 'Глютен, яйца, молочные продукты',
    price: 720,
    weight: '300 г',
    image: '/src/assets/images/dish_truffle_pasta_1795441580658.jpg',
    tag: 'Острое',
    addons: [
      { id: 'extra-stracciatella', name: 'Дополнительная страчателла', price: 150 },
    ],
  },
];

export const ORDER_STEPS = [
  { step: '01', title: 'Выбор блюд', desc: 'Откройте нужную категорию и изучите состав и порции.' },
  { step: '02', title: 'Корзина', desc: 'Добавьте блюда и при необходимости выберите дополнения.' },
  { step: '03', title: 'Проверка заказа', desc: 'Скорректируйте количество позиций и проверьте сумму.' },
  { step: '04', title: 'Способ получения', desc: 'Выберите доставку курьером или самовывоз из бистро.' },
  { step: '05', title: 'Контактные данные', desc: 'Укажите имя, телефон, адрес и удобное время.' },
  { step: '06', title: 'Отправка заказа', desc: 'Нажмите «Оформить заказ» — мы сразу свяжемся для подтверждения.' },
];

export const ADVANTAGES = [
  {
    title: 'Свежие продукты',
    desc: 'Закупаем сезонные овощи, зелень и фермерские продукты небольшими партиями.',
  },
  {
    title: 'Готовим после заказа',
    desc: 'Блюда отправляются на кухню сразу после подтверждения, без заготовок на витрине.',
  },
  {
    title: 'Продуманная упаковка',
    desc: 'Горячее приезжает тёплым, а салаты и соусы упакованы отдельно для сохранения текстуры.',
  },
  {
    title: 'Доставка и самовывоз',
    desc: 'Удобное оформление онлайн — забирайте сами без ожидания или заказывайте к столу.',
  },
];

export const SAMPLE_REVIEWS = [
  {
    id: 'r1',
    author: 'Елена М.',
    dish: 'Стейк лосося со спаржей',
    rating: 5,
    text: 'Пример отзыва: заказывали ужин на двоих — всё приехало тёплым, соус упакован отдельно, порции аккуратные.',
  },
  {
    id: 'r2',
    author: 'Дмитрий К.',
    dish: 'Тальятелле с лесными грибами',
    rating: 5,
    text: 'Пример отзыва: удобный сайт, быстро выбрали блюда с телефона и оформили самовывоз по пути домой.',
  },
  {
    id: 'r3',
    author: 'Анна С.',
    dish: 'Буррата с томатами',
    rating: 5,
    text: 'Пример отзыва: свежие ингредиенты, понятный состав и аллергены указаны сразу в карточке блюда.',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Как оформить заказ?',
    a: 'Выберите понравившиеся блюда в меню, добавьте их в корзину, укажите способ получения (доставка или самовывоз) и контактные данные, затем нажмите «Оформить заказ».',
  },
  {
    q: 'Какие есть способы доставки и можно ли забрать заказ самостоятельно?',
    a: 'Доступна курьерская доставка по городу и самовывоз непосредственно из нашего бистро в часы работы кухни.',
  },
  {
    q: 'Сколько времени занимает доставка и какова её стоимость?',
    a: 'Ориентировочное время и точная стоимость доставки зависят от адреса и текущей загрузки кухни — оператор подтвердит детали при звонке. Для базовой зоны условия отображаются в корзине.',
  },
  {
    q: 'Где посмотреть состав блюд и аллергены?',
    a: 'Нажмите на карточку любого блюда — откроется подробная информация со списком ингредиентов, весом порции и перечнем возможных аллергенов.',
  },
  {
    q: 'Можно ли изменить заказ после оформления?',
    a: 'Да, если кухня ещё не приступила к приготовлению. Сообщите об изменениях оператору во время подтверждающего звонка или по телефону заведения.',
  },
];
