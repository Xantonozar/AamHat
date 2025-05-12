"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useTranslation } from "@/context/translation-context"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { t } = useTranslation()

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Navigate to checkout page
    window.location.href = "/checkout"
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-[#295A43]/30 dark:text-[#FDBE02]/30" />
          <h1 className="text-2xl font-bold mb-4 text-[#295A43] dark:text-white">{t("emptyCart")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Looks like you haven't added any mangoes to your cart yet.
          </p>
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
        <h1 className="text-3xl font-bold mb-8 text-[#295A43] dark:text-white">{t("cart")}</h1>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden dark:bg-[#295A43]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                      index !== cartItems.length - 1 ? "border-b dark:border-gray-700 pb-6 mb-6" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-[#295A43] dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{item.origin}</p>
                      <p className="font-bold text-[#295A43] dark:text-[#FDBE02]">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-[#295A43] dark:text-white" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-[#295A43] dark:text-white" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#295A43] dark:text-[#FDBE02]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-2 flex items-center text-sm"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden h-fit dark:bg-[#295A43]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-[#295A43] dark:text-white">{t("orderSummary")}</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("subtotal")}</span>
                <span className="font-medium dark:text-white">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t("shipping")}</span>
                <span className="font-medium dark:text-white">$5.00</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-4 flex justify-between">
                <span className="font-bold text-[#295A43] dark:text-white">{t("total")}</span>
                <span className="font-bold text-[#295A43] dark:text-[#FDBE02]">${(getCartTotal() + 5).toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3"
            >
              {isCheckingOut ? (
                "Processing..."
              ) : (
                <>
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            <div className="mt-4">
              <Link href="/mangoes">
                <Button variant="outline" className="w-full dark:text-white dark:border-gray-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("continueShopping")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
