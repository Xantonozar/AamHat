"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useTranslation } from "@/context/translation-context"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      className="card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative overflow-hidden">
        <Link href={`/mangoes/${product.id}`}>
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
        </Link>
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 dark:bg-[#295A43]"
          aria-label={inWishlist ? t("removeFromWishlist") : t("addToWishlist")}
        >
          <Heart
            className={`w-5 h-5 ${inWishlist ? "fill-[#FFA94D] text-[#FFA94D]" : "text-gray-600 dark:text-white"}`}
          />
        </button>
      </div>
      <div className="p-4 flex-grow flex flex-col dark:bg-[#1D3F2F] dark:text-white">
        <Link href={`/mangoes/${product.id}`}>
          <h3 className="font-bold text-lg text-[#295A43] mb-1 dark:text-white">{product.name}</h3>
        </Link>
        <div className="text-sm text-gray-500 mb-2 dark:text-gray-300">{product.origin}</div>
        <div className="text-lg font-bold text-[#295A43] mb-4 dark:text-[#FDBE02]">${product.price.toFixed(2)}</div>
        <div className="mt-auto">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-medium transition-all duration-300 dark:text-[#295A43]"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {t("addToCart")}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
