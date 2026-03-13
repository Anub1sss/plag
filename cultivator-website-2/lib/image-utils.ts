import type { Product } from "./parts-data"

export function getProductImage(product: Product): string {
  return product.image || "/placeholder.svg"
}

export function getProductImages(product: Product): string[] {
  return product.images.length > 0 ? product.images : ["/placeholder.svg"]
}

export function getFallbackImage(): string {
  return "/placeholder.svg"
}
