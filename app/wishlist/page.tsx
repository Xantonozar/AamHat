"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { useTranslation } from "@/context/translation-context"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [movingToCart, setMovingToCart] = useState<string[]>([])
  const { t } = useTranslation()

  const handleMoveToCart = (productId: string) => {
    setMovingToCart((prev) => [...prev, productId])

    const product = wishlistItems.find((item) => item.id === productId)
    if (product) {
      addToCart(product)

      // Simulate a delay before removing from wishlist
      setTimeout(() => {
        removeFromWishlist(productId)
        setMovingToCart((prev) => prev.filter((id) => id !== productId))
      }, 500)
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-16 h-16 mx-auto mb-6 text-[#295A43]/30 dark:text-[#FDBE02]/30" />
          <h1 className="text-2xl font-bold mb-4 text-[#295A43] dark:text-white">{t("emptyWishlist")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">You haven't added any mangoes to your wishlist yet.</p>
          <Link href="/mangoes">
            <Button className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("continueShopping")}
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#295A43] dark:text-white">{t("wishlist")}</h1>
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-[#295A43] dark:text-white dark:border-gray-600"
          >
            Clear Wishlist
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden dark:bg-[#295A43]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative aspect-square">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 dark:bg-[#295A43]"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <Link href={`/mangoes/${item.id}`}>
                  <h3 className="font-bold text-lg text-[#295A43] dark:text-white mb-1">{item.name}</h3>
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">{item.origin}</div>
                <div className="text-lg font-bold text-[#295A43] dark:text-[#FDBE02] mb-4">
                  ${item.price.toFixed(2)}
                </div>
                <Button
                  onClick={() => handleMoveToCart(item.id)}
                  disabled={movingToCart.includes(item.id)}
                  className="w-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-medium transition-all duration-300"
                >
                  {movingToCart.includes(item.id) ? (
                    "Moving to Cart..."
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t("moveToCart")}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
