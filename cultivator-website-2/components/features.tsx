import { Wrench, Gauge, Settings, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Gauge,
    title: "Высокая производительность",
    description: "До 18 га/ч за основное время работы для модели КПУ-12",
  },
  {
    icon: Settings,
    title: "Универсальность применения",
    description: "Глубина обработки до 12 см, регулируемая ширина захвата",
  },
  {
    icon: Wrench,
    title: "Надежная конструкция",
    description: "Прочная рама высотой 60 см, качественные материалы",
  },
  {
    icon: Truck,
    title: "Удобная транспортировка",
    description: "Компактные габариты в транспортном положении",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Преимущества наших культиваторов</h2>
          <p className="text-lg text-muted-foreground">Проверенное временем оборудование для эффективного земледелия</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="interactive-card border-primary/30 cursor-pointer bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-all hover:scale-110 hover:rotate-12 shadow-lg">
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
