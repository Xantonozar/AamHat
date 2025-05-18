"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <div className="flex flex-col h-full overflow-hidden">
      <div className="relative aspect-square overflow-hidden group">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={toggleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md transition-all duration-300 hover:scale-110 dark:bg-[#1a3528]/90 z-10"
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-[#295A43] dark:text-white line-clamp-1 text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">{product.origin}</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg text-[#295A43] dark:text-[#FDBE02]">${product.price.toFixed(2)}</span>
          <Button
            onClick={() => addToCart(product)}
            className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] dark:text-[#1a3528] rounded-full w-10 h-10 p-0 flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link href={`/mangoes/${product.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full border-[#295A43] text-[#295A43] hover:bg-[#295A43] hover:text-white dark:border-[#A7D46F] dark:text-[#A7D46F] dark:hover:bg-[#A7D46F] dark:hover:text-[#1a3528]"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
