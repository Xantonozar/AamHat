"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-[#295A43] dark:border-[#3a7057]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={toggleWishlist}
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 dark:bg-[#1a3528]"
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold dark:text-white">{product.name}</h3>
          <span className="font-bold text-[#295A43] dark:text-[#FDBE02]">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          onClick={() => addToCart(product)}
          className="flex-1 bg-[#FDBE02] text-[#295A43] hover:bg-[#FFA94D] dark:bg-[#FDBE02] dark:text-[#1a3528] dark:hover:bg-[#FFA94D]"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Link href={`/mangoes/${product.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full border-[#295A43] text-[#295A43] hover:bg-[#295A43] hover:text-white dark:border-[#A7D46F] dark:text-[#A7D46F] dark:hover:bg-[#A7D46F] dark:hover:text-[#1a3528]"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
