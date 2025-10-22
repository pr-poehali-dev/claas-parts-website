import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

const sampleParts: Part[] = [
  {
    id: '1',
    name: 'Шестерня привода',
    partNumber: '0007701660',
    category: 'Трансмиссия',
    price: 4850,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/d349770a-3016-4ca0-9121-cce66903d5ee.jpg',
    inStock: true
  },
  {
    id: '2',
    name: 'Гидроцилиндр',
    partNumber: '0007341510',
    category: 'Гидравлика',
    price: 18500,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/13d7cb91-2f55-4fa2-adaf-c61c2e87fd83.jpg',
    inStock: true
  },
  {
    id: '3',
    name: 'Ремень приводной',
    partNumber: '0006187950',
    category: 'Двигатель',
    price: 2350,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/cdbc3f86-31b5-498a-b98d-8877a6bee912.jpg',
    inStock: true
  },
  {
    id: '4',
    name: 'Фильтр масляный',
    partNumber: '0007820240',
    category: 'Фильтры',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/d349770a-3016-4ca0-9121-cce66903d5ee.jpg',
    inStock: false
  },
  {
    id: '5',
    name: 'Подшипник ступичный',
    partNumber: '0006541230',
    category: 'Ходовая часть',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/d349770a-3016-4ca0-9121-cce66903d5ee.jpg',
    inStock: true
  },
  {
    id: '6',
    name: 'Радиатор охлаждения',
    partNumber: '0009871430',
    category: 'Система охлаждения',
    price: 12400,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/13d7cb91-2f55-4fa2-adaf-c61c2e87fd83.jpg',
    inStock: true
  }
];

export default function Index() {
  const [cart, setCart] = useState<{part: Part, quantity: number}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSection, setCurrentSection] = useState('home');

  const addToCart = (part: Part) => {
    setCart(prev => {
      const existing = prev.find(item => item.part.id === part.id);
      if (existing) {
        return prev.map(item => 
          item.part.id === part.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, {part, quantity: 1}];
    });
  };

  const removeFromCart = (partId: string) => {
    setCart(prev => prev.filter(item => item.part.id !== partId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.part.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredParts = sampleParts.filter(part => 
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.partNumber.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold text-secondary">
                CLAAS
              </div>
              <nav className="hidden md:flex gap-6">
                <button 
                  onClick={() => setCurrentSection('home')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'home' ? 'text-primary' : 'text-foreground'}`}
                >
                  Главная
                </button>
                <button 
                  onClick={() => setCurrentSection('catalog')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'catalog' ? 'text-primary' : 'text-foreground'}`}
                >
                  Каталог запчастей
                </button>
                <button 
                  onClick={() => setCurrentSection('about')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'about' ? 'text-primary' : 'text-foreground'}`}
                >
                  О компании
                </button>
                <button 
                  onClick={() => setCurrentSection('delivery')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'delivery' ? 'text-primary' : 'text-foreground'}`}
                >
                  Доставка и оплата
                </button>
                <button 
                  onClick={() => setCurrentSection('contacts')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'contacts' ? 'text-primary' : 'text-foreground'}`}
                >
                  Контакты
                </button>
              </nav>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {totalItems > 0 ? `Товаров в корзине: ${totalItems}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map(item => (
                    <div key={item.part.id} className="flex items-center gap-4 pb-4 border-b">
                      <img src={item.part.image} alt={item.part.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.part.name}</p>
                        <p className="text-xs text-muted-foreground">{item.part.partNumber}</p>
                        <p className="text-sm font-semibold text-primary">{item.part.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">×{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.part.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {totalItems > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {currentSection === 'home' && (
        <>
          <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Оригинальные запчасти CLAAS
                </h1>
                <p className="text-lg mb-8 opacity-90">
                  Широкий ассортимент запасных частей для сельскохозяйственной техники CLAAS. Гарантия качества и быстрая доставка по всей России.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                  <Input 
                    placeholder="Поиск по номеру запчасти" 
                    className="bg-white text-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="secondary" size="lg" className="whitespace-nowrap">
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="ShieldCheck" size={32} className="text-primary" />
                    </div>
                    <CardTitle>Оригинальные запчасти</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Только сертифицированные детали с гарантией от производителя
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Truck" size={32} className="text-secondary" />
                    </div>
                    <CardTitle>Быстрая доставка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Доставка по всей России в течение 1-3 дней
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Headphones" size={32} className="text-primary" />
                    </div>
                    <CardTitle>Поддержка 24/7</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Наши специалисты помогут с выбором нужной запчасти
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mb-8">Популярные запчасти</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredParts.map(part => (
                  <Card key={part.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-muted relative">
                      <img 
                        src={part.image} 
                        alt={part.name}
                        className="w-full h-full object-cover"
                      />
                      {!part.inStock && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Под заказ
                        </Badge>
                      )}
                      {part.inStock && (
                        <Badge className="absolute top-2 right-2 bg-primary">
                          В наличии
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg">{part.name}</CardTitle>
                          <CardDescription className="font-mono text-xs">
                            {part.partNumber}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">{part.category}</Badge>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {part.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button 
                        onClick={() => addToCart(part)}
                        disabled={!part.inStock}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentSection === 'catalog' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">Каталог запчастей</h1>
            <div className="mb-8">
              <Input 
                placeholder="Поиск по названию или номеру запчасти" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParts.map(part => (
                <Card key={part.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-muted relative">
                    <img 
                      src={part.image} 
                      alt={part.name}
                      className="w-full h-full object-cover"
                    />
                    {!part.inStock && (
                      <Badge variant="destructive" className="absolute top-2 right-2">
                        Под заказ
                      </Badge>
                    )}
                    {part.inStock && (
                      <Badge className="absolute top-2 right-2 bg-primary">
                        В наличии
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{part.name}</CardTitle>
                        <CardDescription className="font-mono text-xs">
                          {part.partNumber}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{part.category}</Badge>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {part.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button 
                      onClick={() => addToCart(part)}
                      disabled={!part.inStock}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentSection === 'about' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">О компании</h1>
            <div className="space-y-6 text-lg">
              <p>
                Мы являемся официальным дилером запасных частей для сельскохозяйственной техники CLAAS с 2010 года.
              </p>
              <p>
                Наша компания специализируется на поставке оригинальных запчастей для комбайнов, тракторов и другой техники CLAAS. Мы работаем напрямую с производителем, что позволяет нам гарантировать подлинность и качество всех деталей.
              </p>
              <p>
                В нашем ассортименте более 50 000 наименований запасных частей. Мы поможем подобрать нужную деталь по VIN-номеру техники или каталожному номеру запчасти.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">13+</div>
                  <div className="text-muted-foreground">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-muted-foreground">запчастей</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                  <div className="text-muted-foreground">клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">оригинал</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentSection === 'delivery' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Доставка и оплата</h1>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Доставка</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Icon name="Truck" size={24} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">По Москве и МО</h3>
                      <p className="text-muted-foreground">Курьерская доставка в течение 1-2 дней. Стоимость от 500 рублей.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="Package" size={24} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">По России</h3>
                      <p className="text-muted-foreground">Доставка транспортными компаниями (СДЭК, ПЭК, Деловые линии) в течение 2-5 дней.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="MapPin" size={24} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Самовывоз</h3>
                      <p className="text-muted-foreground">Бесплатно со склада в Москве, ежедневно с 9:00 до 18:00.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Оплата</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Icon name="CreditCard" size={24} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Банковской картой</h3>
                      <p className="text-muted-foreground">Принимаем Visa, MasterCard, МИР. Безопасная оплата онлайн.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="Building" size={24} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Безналичный расчет</h3>
                      <p className="text-muted-foreground">Для юридических лиц по счету с НДС.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Icon name="Banknote" size={24} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Наличными</h3>
                      <p className="text-muted-foreground">При самовывозе или курьеру при получении.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentSection === 'contacts' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Контакты</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Icon name="MapPin" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Адрес склада</h3>
                    <p className="text-muted-foreground">
                      г. Москва, Промышленная ул., д. 15, стр. 3<br />
                      Ежедневно с 9:00 до 18:00
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Phone" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">
                      +7 (495) 123-45-67<br />
                      +7 (800) 555-35-35 (бесплатно по России)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Mail" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@claas-parts.ru<br />
                      sales@claas-parts.ru
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Clock" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">
                      Пн-Пт: 9:00 - 18:00<br />
                      Сб-Вс: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Напишите нам</CardTitle>
                  <CardDescription>Мы ответим в течение часа</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="tel" placeholder="Телефон" />
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Тема сообщения" />
                  <Button className="w-full">Отправить</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-secondary">CLAAS</h3>
              <p className="text-sm text-muted-foreground">
                Официальный поставщик оригинальных запчастей для сельхозтехники
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Комбайны</li>
                <li>Тракторы</li>
                <li>Кормоуборочная техника</li>
                <li>Пресс-подборщики</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Гарантия</li>
                <li>Возврат</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@claas-parts.ru</li>
                <li>Москва, Промышленная 15</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 CLAAS Parts Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
