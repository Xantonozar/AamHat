"use client"

import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { useCheckout } from "@/context/checkout-context"

interface OrderSummaryProps {
  showItems?: boolean
}

export function OrderSummary({ showItems = true }: OrderSummaryProps) {
  const { cartItems, getCartTotal } = useCart()
  const { shippingCost, tax } = useCheckout()

  const subtotal = getCartTotal()
  const total = subtotal + shippingCost + tax

  return (
    <div className="bg-white rounded-lg shadow-md p-6 dark:bg-[#295A43]">
      <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">Order Summary</h3>

      {showItems && cartItems.length > 0 && (
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#295A43] dark:text-white">{item.name}</h4>
                <div className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</div>
              </div>
              <div className="font-semibold text-[#295A43] dark:text-[#FDBE02]">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 border-t pt-4 dark:border-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-medium dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className="font-medium dark:text-white">${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Tax</span>
          <span className="font-medium dark:text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2 dark:border-gray-600">
          <span className="font-bold text-[#295A43] dark:text-white">Total</span>
          <span className="font-bold text-[#295A43] dark:text-[#FDBE02]">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
