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
  },
  {
    id: '7',
    name: 'Топливный насос высокого давления',
    partNumber: '0008456710',
    category: 'Топливная система',
    price: 28500,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/d349770a-3016-4ca0-9121-cce66903d5ee.jpg',
    inStock: true
  },
  {
    id: '8',
    name: 'Воздушный фильтр',
    partNumber: '0007236890',
    category: 'Фильтры',
    price: 1450,
    image: 'https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/cdbc3f86-31b5-498a-b98d-8877a6bee912.jpg',
    inStock: true
  }
];

export default function Index() {
  const [cart, setCart] = useState<{part: Part, quantity: number}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      <div 
        className="relative bg-cover bg-center py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://cdn.poehali.dev/projects/23ef561f-b54d-4239-8a99-bcfeea709a10/files/cab1dd30-ab4d-4e2c-83b3-8b8a650d21ba.jpg')`
        }}
      >
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="relative">
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
          
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={18} />
              <span className="text-sm">info@class-detail.ru</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={18} />
              <span className="text-sm">+7 (495) 123-45-67</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CLASS DETAIL
            </h1>
            <p className="text-xl mb-12 opacity-90">
              Запчасти для сельхозтехники CLAAS
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <Input 
                placeholder="Поиск по названию" 
                className="h-14 pr-14 text-lg bg-white/95 backdrop-blur"
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
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Запчасти CLAAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <CardTitle className="text-base">{part.name}</CardTitle>
                  <p className="text-xs text-muted-foreground font-mono">{part.partNumber}</p>
                  <Badge variant="outline" className="w-fit text-xs">{part.category}</Badge>
                </CardHeader>
                <CardFooter className="flex flex-col gap-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl font-bold text-primary">
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

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShieldCheck" size={32} className="text-primary" />
                </div>
                <CardTitle>Оригинальные запчасти</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Только сертифицированные детали CLAAS с гарантией
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
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

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} className="text-primary" />
                </div>
                <CardTitle>Поддержка 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Наши специалисты помогут с выбором запчасти
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-2xl mb-4">CLASS DETAIL</h3>
              <p className="text-sm opacity-90">
                Надёжный поставщик оригинальных запчастей для сельхозтехники CLAAS
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@class-detail.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, Промышленная 15</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <div className="text-sm opacity-90 space-y-1">
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб-Вс: 10:00 - 16:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center text-sm opacity-75">
            <p>© 2024 CLASS DETAIL. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}