import { getProductById, allParts } from "@/lib/parts-data"
import { ProductDetailClient } from "@/components/product-detail-client"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return allParts.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(Number.parseInt(id))

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
