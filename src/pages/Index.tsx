import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/a9f4e77b-c44d-44a9-9074-c4fc6a1e9083.jpg',
    inStock: true
  },
  {
    id: '2',
    name: 'Гидроцилиндр',
    partNumber: '0007341510',
    category: 'Гидравлика',
    price: 18500,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/26d92459-291f-4505-a1ef-eff647b8dbd2.jpg',
    inStock: true
  },
  {
    id: '3',
    name: 'Ремень приводной',
    partNumber: '0006187950',
    category: 'Двигатель',
    price: 2350,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/a9f4e77b-c44d-44a9-9074-c4fc6a1e9083.jpg',
    inStock: true
  },
  {
    id: '4',
    name: 'Фильтр масляный',
    partNumber: '0007820240',
    category: 'Фильтры',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/26d92459-291f-4505-a1ef-eff647b8dbd2.jpg',
    inStock: false
  },
  {
    id: '5',
    name: 'Подшипник ступичный',
    partNumber: '0006541230',
    category: 'Ходовая часть',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/a9f4e77b-c44d-44a9-9074-c4fc6a1e9083.jpg',
    inStock: true
  },
  {
    id: '6',
    name: 'Радиатор охлаждения',
    partNumber: '0009871430',
    category: 'Система охлаждения',
    price: 12400,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/26d92459-291f-4505-a1ef-eff647b8dbd2.jpg',
    inStock: true
  },
  {
    id: '7',
    name: 'Топливный насос высокого давления',
    partNumber: '0008456710',
    category: 'Топливная система',
    price: 28500,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/a9f4e77b-c44d-44a9-9074-c4fc6a1e9083.jpg',
    inStock: true
  },
  {
    id: '8',
    name: 'Воздушный фильтр',
    partNumber: '0007236890',
    category: 'Фильтры',
    price: 1450,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/26d92459-291f-4505-a1ef-eff647b8dbd2.jpg',
    inStock: true
  }
];

export default function Index() {
  const [cart, setCart] = useState<{part: Part, quantity: number}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

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

  const updateQuantity = (partId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.part.id === partId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? {...item, quantity: newQuantity} : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.part.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredParts = sampleParts.filter(part => 
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.partNumber.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl">
                C
              </div>
              <div>
                <h1 className="text-2xl font-bold">CLAAS DETAIL</h1>
                <p className="text-xs opacity-90">Оригинальные запчасти</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-secondary ${activeSection === 'home' ? 'text-secondary' : ''}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('catalog')}
                className={`text-sm font-medium transition-colors hover:text-secondary ${activeSection === 'catalog' ? 'text-secondary' : ''}`}
              >
                Каталог товаров
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-secondary ${activeSection === 'about' ? 'text-secondary' : ''}`}
              >
                О компании
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors hover:text-secondary ${activeSection === 'contacts' ? 'text-secondary' : ''}`}
              >
                Контакты
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-4 text-sm">
                <a href="tel:+74951234567" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </a>
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-white">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {totalItems > 0 ? `Товаров в корзине: ${totalItems}` : 'Корзина пуста'}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.map(item => (
                      <div key={item.part.id} className="flex items-center gap-4 pb-4 border-b">
                        <img src={item.part.image} alt={item.part.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.part.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{item.part.partNumber}</p>
                          <p className="text-sm font-semibold text-primary mt-1">{item.part.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.part.id, -1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.part.id, 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.part.id)}
                            className="text-destructive hover:text-destructive h-6"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalItems > 0 && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between text-lg font-semibold border-t pt-4">
                        <span>Итого:</span>
                        <span className="text-primary text-2xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
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
        </div>
      </header>

      {activeSection === 'home' && (
        <>
          <section 
            className="relative bg-cover bg-center py-32"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/e56233fc-3378-43ff-a62b-0c73d6b1449c.jpg')`
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Запчасти для техники CLAAS
                </h2>
                <p className="text-xl mb-12 opacity-90">
                  Оригинальные детали с гарантией качества
                </p>
                
                <div className="relative max-w-2xl mx-auto">
                  <Input 
                    placeholder="Поиск по названию или артикулу" 
                    className="h-14 pr-14 text-lg bg-white text-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    size="icon" 
                    className="absolute right-1 top-1 h-12 w-12"
                  >
                    <Icon name="Search" size={24} />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Card className="text-center border-t-4 border-t-primary">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="ShieldCheck" size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">Оригинал 100%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Только сертифицированные детали CLAAS
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-t-4 border-t-secondary">
                  <CardHeader>
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Truck" size={32} className="text-secondary" />
                    </div>
                    <CardTitle className="text-lg">Доставка 1-3 дня</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      По всей России быстро и надёжно
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-t-4 border-t-primary">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Package" size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">50 000+ позиций</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Огромный ассортимент в наличии
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-t-4 border-t-secondary">
                  <CardHeader>
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Headphones" size={32} className="text-secondary" />
                    </div>
                    <CardTitle className="text-lg">Поддержка 24/7</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Консультация по подбору запчастей
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Популярные запчасти</h2>
                <Button variant="outline" onClick={() => setActiveSection('catalog')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sampleParts.slice(0, 4).map(part => (
                  <Card key={part.id} className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary">
                    <div className="aspect-square bg-muted relative">
                      <img 
                        src={part.image} 
                        alt={part.name}
                        className="w-full h-full object-cover"
                      />
                      {!part.inStock && (
                        <Badge variant="destructive" className="absolute top-3 right-3">
                          Под заказ
                        </Badge>
                      )}
                      {part.inStock && (
                        <Badge className="absolute top-3 right-3 bg-primary">
                          В наличии
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">{part.name}</CardTitle>
                      <p className="text-xs text-muted-foreground font-mono">{part.partNumber}</p>
                      <Badge variant="outline" className="w-fit text-xs">{part.category}</Badge>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-3">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl font-bold text-primary">
                          {part.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Button 
                        onClick={() => addToCart(part)}
                        disabled={!part.inStock}
                        className="w-full"
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

      {activeSection === 'catalog' && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Каталог товаров</h2>
            <div className="mb-8">
              <div className="relative max-w-xl">
                <Input 
                  placeholder="Поиск по названию или номеру запчасти" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pr-12"
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 top-1 h-10 w-10"
                >
                  <Icon name="Search" size={20} />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredParts.map(part => (
                <Card key={part.id} className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary">
                  <div className="aspect-square bg-muted relative">
                    <img 
                      src={part.image} 
                      alt={part.name}
                      className="w-full h-full object-cover"
                    />
                    {!part.inStock && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        Под заказ
                      </Badge>
                    )}
                    {part.inStock && (
                      <Badge className="absolute top-3 right-3 bg-primary">
                        В наличии
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base">{part.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">{part.partNumber}</p>
                    <Badge variant="outline" className="w-fit text-xs">{part.category}</Badge>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl font-bold text-primary">
                        {part.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <Button 
                      onClick={() => addToCart(part)}
                      disabled={!part.inStock}
                      className="w-full"
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

      {activeSection === 'about' && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">О компании CLAAS DETAIL</h2>
            <div className="space-y-6 text-lg">
              <p>
                Компания CLAAS DETAIL — официальный поставщик оригинальных запчастей для сельскохозяйственной техники CLAAS в России с 2010 года.
              </p>
              <p>
                Мы специализируемся на поставке запасных частей для комбайнов, тракторов, пресс-подборщиков и другой техники CLAAS. Работаем напрямую с производителем, что гарантирует подлинность и качество всех деталей.
              </p>
              <p>
                В нашем ассортименте более 50 000 наименований запчастей. Мы поможем подобрать нужную деталь по VIN-номеру техники, каталожному номеру или по описанию неисправности.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">14+</div>
                  <div className="text-muted-foreground">лет на рынке</div>
                </div>
                <div className="text-center p-6 bg-secondary/5 rounded-lg">
                  <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
                  <div className="text-muted-foreground">запчастей</div>
                </div>
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                  <div className="text-muted-foreground">клиентов</div>
                </div>
                <div className="text-center p-6 bg-secondary/5 rounded-lg">
                  <div className="text-4xl font-bold text-secondary mb-2">100%</div>
                  <div className="text-muted-foreground">оригинал</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Наши контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex gap-3">
                      <Icon name="MapPin" size={24} className="text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-2">Адрес склада</CardTitle>
                        <p className="text-muted-foreground font-normal">
                          г. Москва, Промышленная ул., д. 15, стр. 3<br />
                          Ежедневно с 9:00 до 18:00
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex gap-3">
                      <Icon name="Phone" size={24} className="text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-2">Телефоны</CardTitle>
                        <p className="text-muted-foreground font-normal">
                          +7 (495) 123-45-67<br />
                          +7 (800) 555-35-35 (бесплатно)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex gap-3">
                      <Icon name="Mail" size={24} className="text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-2">Email</CardTitle>
                        <p className="text-muted-foreground font-normal">
                          info@claas-detail.ru<br />
                          sales@claas-detail.ru
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex gap-3">
                      <Icon name="Clock" size={24} className="text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg mb-2">Режим работы</CardTitle>
                        <p className="text-muted-foreground font-normal">
                          Пн-Пт: 9:00 - 18:00<br />
                          Сб-Вс: 10:00 - 16:00
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Напишите нам</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Ваше имя *" />
                  <Input type="tel" placeholder="Телефон *" />
                  <Input type="email" placeholder="Email *" />
                  <Input placeholder="Номер запчасти (опционально)" />
                  <textarea 
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                    placeholder="Ваше сообщение"
                  />
                  <Button className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-xl">
                  C
                </div>
                <div>
                  <h3 className="font-bold text-xl">CLAAS DETAIL</h3>
                </div>
              </div>
              <p className="text-sm opacity-90">
                Надёжный поставщик оригинальных запчастей для сельхозтехники CLAAS с 2010 года
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Навигация</h4>
              <div className="space-y-2 text-sm opacity-90">
                <button onClick={() => setActiveSection('home')} className="block hover:text-secondary transition-colors">Главная</button>
                <button onClick={() => setActiveSection('catalog')} className="block hover:text-secondary transition-colors">Каталог</button>
                <button onClick={() => setActiveSection('about')} className="block hover:text-secondary transition-colors">О компании</button>
                <button onClick={() => setActiveSection('contacts')} className="block hover:text-secondary transition-colors">Контакты</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex items-start gap-2">
                  <Icon name="Phone" size={16} className="mt-0.5" />
                  <div>
                    <div>+7 (495) 123-45-67</div>
                    <div>+7 (800) 555-35-35</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@claas-detail.ru</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="mt-0.5" />
                  <span>Москва, Промышленная 15, стр. 3</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Режим работы</h4>
              <div className="text-sm opacity-90 space-y-1">
                <p>Понедельник - Пятница</p>
                <p className="font-semibold">9:00 - 18:00</p>
                <p className="mt-2">Суббота - Воскресенье</p>
                <p className="font-semibold">10:00 - 16:00</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 text-center text-sm opacity-75">
            <p>© 2024 CLAAS DETAIL. Все права защищены. Официальный дилер запчастей CLAAS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
