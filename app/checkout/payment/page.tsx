"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, LockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/context/cart-context"
import { useCheckout } from "@/context/checkout-context"
import { validateCreditCard } from "@/lib/checkout-utils"

export default function PaymentPage() {
  const router = useRouter()
  const { cartItems } = useCart()
  const { state, setPaymentMethod, setPaymentDetails, processOrder, setStep } = useCheckout()

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
      return
    }

    // Redirect to shipping if shipping address is not set
    if (!state.shippingAddress) {
      router.push("/checkout")
      return
    }

    // Set the current step
    setStep("payment")
  }, [cartItems.length, state.shippingAddress, router, setStep])

  const validatePayment = () => {
    const newErrors: string[] = []

    if (state.paymentMethod === "credit_card") {
      if (!state.paymentDetails) {
        newErrors.push("Please enter your payment details")
        return false
      }

      const { cardNumber, cardholderName, expiryDate, cvv } = state.paymentDetails

      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
        newErrors.push("Please enter a valid card number")
      } else if (!validateCreditCard(cardNumber)) {
        newErrors.push("Invalid card number")
      }

      if (!cardholderName) {
        newErrors.push("Please enter the cardholder name")
      }

      if (!expiryDate || expiryDate.length < 5) {
        newErrors.push("Please enter a valid expiry date (MM/YY)")
      } else {
        const [month, year] = expiryDate.split("/")
        const currentYear = new Date().getFullYear() % 100
        const currentMonth = new Date().getMonth() + 1

        if (
          Number.parseInt(year) < currentYear ||
          (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
        ) {
          newErrors.push("Card has expired")
        }
      }

      if (!cvv || cvv.length < 3) {
        newErrors.push("Please enter a valid CVV")
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handlePlaceOrder = async () => {
    if (!validatePayment()) {
      return
    }

    setIsProcessing(true)

    try {
      await processOrder()
      // Navigation to confirmation page is handled in processOrder
    } catch (error) {
      console.error("Error processing order:", error)
      setErrors(["An error occurred while processing your order. Please try again."])
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0 || !state.shippingAddress) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#295A43] dark:text-white">Payment</h1>
          <Link href="/checkout" className="text-[#295A43] dark:text-white flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shipping
          </Link>
        </div>

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
                2
              </div>
              <span className="text-sm mt-1 font-medium text-[#295A43] dark:text-white">Payment</span>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                3
              </div>
              <span className="text-sm mt-1 text-gray-600 dark:text-gray-300">Confirmation</span>
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
              <PaymentForm
                paymentMethod={state.paymentMethod}
                paymentDetails={state.paymentDetails}
                onPaymentMethodChange={setPaymentMethod}
                onPaymentDetailsChange={setPaymentDetails}
              />

              {errors.length > 0 && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/50 dark:text-red-200 dark:border-red-800">
                  <ul className="list-disc pl-5">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 pt-6 border-t dark:border-gray-600 flex items-center">
                <LockIcon className="w-5 h-5 text-[#295A43] dark:text-[#FDBE02] mr-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </motion.div>

            <div className="flex justify-end">
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    Place Order <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <OrderSummary />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
