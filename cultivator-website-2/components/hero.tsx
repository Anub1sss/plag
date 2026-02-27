import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-48 w-48 md:h-64 md:w-64">
              <Image
                src="/svg/cultivator/Tilda_Icons_26snw_wh.svg"
                alt="Культиватор"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="shimmer-text mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Культиваторы КПУ-9 / КПУ-12
          </h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Высокопроизводительное оборудование для профессиональной обработки почвы. Надежность, эффективность и
            качество в каждой детали.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-primary/50 transition-shadow">
              Скачать техническую документацию
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/50 hover:bg-primary/10 bg-transparent"
            >
              <a href="#specs">Сравнить модели</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.65_0.22_145_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.65_0.22_145_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,oklch(0.65_0.22_145_/_0.1),transparent_50%)]"></div>
    </section>
  )
}
