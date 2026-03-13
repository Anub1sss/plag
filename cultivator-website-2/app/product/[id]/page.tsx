import type { Metadata } from "next"
import { getProductById, allProducts } from "@/lib/parts-data"
import { ProductDetailClient } from "@/components/product-detail-client"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(Number.parseInt(id))
  if (!product) return { title: "Товар не найден" }
  return {
    title: `${product.name} — ${product.categoryName}`,
    description: `Купить ${product.name}. Категория: ${product.categoryName}.${product.subcategory ? ` Подкатегория: ${product.subcategory}.` : ""} Запчасти для сельхозтехники с доставкой по России.`,
    openGraph: {
      title: product.name,
      description: `${product.name} — запчасть для сельхозтехники. ${product.categoryName}.`,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(Number.parseInt(id))

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
