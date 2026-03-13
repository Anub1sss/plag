import { Suspense } from "react"
import type { Metadata } from "next"
import { CatalogPageClient } from "@/components/catalog-page-client"

export const metadata: Metadata = {
  title: "Каталог запчастей для сельхозтехники",
  description:
    "Полный каталог запасных частей для сельскохозяйственной техники: культиваторы, плуги, бороны, сеялки, опрыскиватели. Удобный поиск и фильтрация.",
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogPageClient />
    </Suspense>
  )
}
