"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCheckout } from "@/context/checkout-context"
import { formatDate, getShippingMethodLabel } from "@/lib/checkout-utils"

export default function ConfirmationPage() {
  const router = useRouter()
  const { state, setStep } = useCheckout()

  useEffect(() => {
    // Redirect to home if no order ID (meaning order wasn't processed)
    if (!state.orderId) {
      router.push("/")
      return
    }

    // Set the current step
    setStep("confirmation")
  }, [state.orderId, router, setStep])

  if (!state.orderId || !state.orderDate || !state.estimatedDelivery) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-[#295A43] dark:text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Thank you for your order. Your mangoes are on the way!
          </p>
        </motion.div>

        {/* Checkout Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FDBE02] rounded-full flex items-center justify-center text-[#295A43] font-bold">
                ✓
              </div>
              <span className="text-sm mt-1 font-medium text-[#295A43] dark:text-white">Shipping</span>
            </div>
            <div className="w-16 h-1 bg-[#FDBE02] dark:bg-[#FDBE02] mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FDBE02] rounded-full flex items-center justify-center text-[#295A43] font-bold">
                ✓
              </div>
              <span className="text-sm mt-1 font-medium text-[#295A43] dark:text-white">Payment</span>
            </div>
            <div className="w-16 h-1 bg-[#FDBE02] dark:bg-[#FDBE02] mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FDBE02] rounded-full flex items-center justify-center text-[#295A43] font-bold">
                ✓
              </div>
              <span className="text-sm mt-1 font-medium text-[#295A43] dark:text-white">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 dark:bg-[#295A43]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Order Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">Order Number:</span>
                  <span className="font-medium dark:text-white">{state.orderId}</span>
                </div>

                <div className="flex justify-between border-b pb-2 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">Order Date:</span>
                  <span className="font-medium dark:text-white">{formatDate(state.orderDate)}</span>
                </div>

                <div className="flex justify-between border-b pb-2 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">Shipping Method:</span>
                  <span className="font-medium dark:text-white">{getShippingMethodLabel(state.shippingMethod)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Estimated Delivery:</span>
                  <span className="font-medium dark:text-white">{formatDate(state.estimatedDelivery)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6 dark:bg-[#295A43]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Shipping Address</h2>

              {state.shippingAddress && (
                <div className="space-y-1">
                  <p className="font-medium dark:text-white">{state.shippingAddress.fullName}</p>
                  <p className="text-gray-600 dark:text-gray-300">{state.shippingAddress.addressLine1}</p>
                  {state.shippingAddress.addressLine2 && (
                    <p className="text-gray-600 dark:text-gray-300">{state.shippingAddress.addressLine2}</p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300">
                    {state.shippingAddress.city}, {state.shippingAddress.state} {state.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{state.shippingAddress.country}</p>
                  <p className="text-gray-600 dark:text-gray-300">{state.shippingAddress.phone}</p>
                </div>
              )}
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6 dark:bg-[#295A43]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Track Your Order</h2>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#FDBE02]"></div>

                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 w-8 h-8 bg-[#FDBE02] rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-[#295A43]" />
                  </div>
                  <h3 className="font-medium text-[#295A43] dark:text-white">Order Placed</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(state.orderDate)}</p>
                </div>

                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-600 dark:text-gray-300">Processing</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your order is being processed</p>
                </div>

                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-600 dark:text-gray-300">Shipped</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your order will be shipped soon</p>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-600 dark:text-gray-300">Delivery</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estimated delivery: {formatDate(state.estimatedDelivery)}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <Link href="/">
                <Button className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8">
                  Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <OrderSummary showItems={true} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
