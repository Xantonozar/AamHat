"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AddressForm } from "@/components/checkout/address-form"
import { ShippingMethodSelector } from "@/components/checkout/shipping-method"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/context/cart-context"
import { useCheckout } from "@/context/checkout-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems } = useCart()
  const { state, setShippingAddress, setBillingAddress, setSameAsShipping, setShippingMethod, setStep } = useCheckout()

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }

    // Set the current step
    setStep("shipping")
  }, [cartItems.length, router, setStep])

  const handleContinue = () => {
    if (!state.shippingAddress) {
      alert("Please fill in your shipping address")
      return
    }

    if (state.sameAsShipping) {
      setBillingAddress(state.shippingAddress)
    } else if (!state.billingAddress) {
      alert("Please fill in your billing address")
      return
    }

    router.push("/checkout/payment")
  }

  if (cartItems.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#295A43] dark:text-white">Checkout</h1>
          <Link href="/cart" className="text-[#295A43] dark:text-white flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        {/* Checkout Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#FDBE02] rounded-full flex items-center justify-center text-[#295A43] font-bold">
                1
              </div>
              <span className="text-sm mt-1 font-medium text-[#295A43] dark:text-white">Shipping</span>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                2
              </div>
              <span className="text-sm mt-1 text-gray-600 dark:text-gray-300">Payment</span>
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
              <AddressForm
                title="Shipping Address"
                address={state.shippingAddress}
                onAddressChange={setShippingAddress}
              />
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6 dark:bg-[#295A43]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ShippingMethodSelector selectedMethod={state.shippingMethod} onMethodChange={setShippingMethod} />
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6 dark:bg-[#295A43]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameAsShipping"
                  checked={state.sameAsShipping}
                  onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                />
                <Label htmlFor="sameAsShipping">Billing address same as shipping address</Label>
              </div>

              {!state.sameAsShipping && (
                <AddressForm
                  title="Billing Address"
                  address={state.billingAddress}
                  onAddressChange={setBillingAddress}
                />
              )}
            </motion.div>

            <div className="flex justify-end">
              <Button
                onClick={handleContinue}
                className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8"
              >
                Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
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
