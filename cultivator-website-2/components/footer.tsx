import { Mail, Phone, MapPin, Truck, CreditCard, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Быстрая доставка</h4>
              <p className="text-sm text-muted-foreground">По всей России</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Удобная оплата</h4>
              <p className="text-sm text-muted-foreground">Наличные и карты</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Гарантия качества</h4>
              <p className="text-sm text-muted-foreground">Оригинальные запчасти</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="shimmer-text mb-4 text-lg font-bold">АгроЗапчасти</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Поставка качественных запасных частей для сельскохозяйственной техники. Культиваторы, плуги, бороны,
              сеялки и многое другое.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@agrozapchasti.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Россия, г. Москва</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Каталог</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#catalog" className="transition-colors hover:text-primary">
                  Культиваторы
                </a>
              </li>
              <li>
                <a href="#catalog" className="transition-colors hover:text-primary">
                  Плуги
                </a>
              </li>
              <li>
                <a href="#catalog" className="transition-colors hover:text-primary">
                  Бороны
                </a>
              </li>
              <li>
                <a href="#catalog" className="transition-colors hover:text-primary">
                  Сеялки
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Информация</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  О компании
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Гарантия
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-primary">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} АгроЗапчасти. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
