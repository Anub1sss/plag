import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const specs = [
  { parameter: "Производительность за 1ч основного времени, га/ч, до", kpu9: "13,5", kpu12: "18,0" },
  { parameter: "Рабочая скорость движения на основных операциях, км/ч, не более", kpu9: "15", kpu12: "15" },
  { parameter: "Способ агрегирования", kpu9: "Прицепной", kpu12: "Прицепной" },
  { parameter: "Дорожный просвет, мм, не менее", kpu9: "300", kpu12: "300" },
  { parameter: "Рабочая ширина захвата (конструкционная), м", kpu9: "9", kpu12: "12" },
  { parameter: "Глубина обработки, см, до", kpu9: "12", kpu12: "12" },
  { parameter: "Масса машины, кг, сухая (конструкционная)", kpu9: "7050", kpu12: "8700" },
  { parameter: "Габариты в рабочем положении, мм (ШхДхВ), не более", kpu9: "9000х9000х1370", kpu12: "12000х9000х1370" },
  {
    parameter: "Габариты в транспортном положении, мм (ШхДхВ), не более",
    kpu9: "3000х8500х4000",
    kpu12: "3000х8500х4000",
  },
  { parameter: "Высота рамы, см", kpu9: "60", kpu12: "60" },
  { parameter: "Количество стоек, шт.", kpu9: "54", kpu12: "72" },
  { parameter: "Количество рядов, шт.", kpu9: "4", kpu12: "4" },
  { parameter: "Расстояние между стойками, мм", kpu9: "167", kpu12: "167" },
  { parameter: "Диаметр катка, мм", kpu9: "530", kpu12: "530" },
  { parameter: "Диаметр зуба бороны, мм", kpu9: "12", kpu12: "12" },
  { parameter: "Количество выравнивателей, шт.", kpu9: "36", kpu12: "48" },
  { parameter: "Диаметр петли прицепной, мм", kpu9: "60", kpu12: "60" },
  { parameter: "Шины транспортных колес", kpu9: "500/55-20", kpu12: "500/55-20" },
  { parameter: "Шины опорных колес", kpu9: "380/55-17", kpu12: "380/55-17" },
]

export function SpecsComparison() {
  return (
    <section id="specs" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Технические характеристики</h2>
          <p className="text-lg text-muted-foreground">Сравните параметры моделей КПУ-9 и КПУ-12</p>
        </div>
        <Card className="neon-border mx-auto max-w-6xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <CardTitle className="text-2xl">Сравнительная таблица</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/30">
                    <TableHead className="w-1/2">Наименование показателя</TableHead>
                    <TableHead className="text-center text-primary">КПУ-9</TableHead>
                    <TableHead className="text-center text-secondary">КПУ-12</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specs.map((spec, index) => (
                    <TableRow key={index} className="border-border/50 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium">{spec.parameter}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">{spec.kpu9}</TableCell>
                      <TableCell className="text-center font-semibold text-secondary">{spec.kpu12}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
