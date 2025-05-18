"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { generateOrderId } from "@/lib/checkout-utils"

export type ShippingMethod = "standard" | "express" | "overnight"

export type PaymentMethod = "credit_card" | "paypal" | "apple_pay"

export interface Address {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface PaymentDetails {
  cardNumber: string
  cardholderName: string
  expiryDate: string
  cvv: string
}

export interface CheckoutState {
  step: "shipping" | "payment" | "confirmation"
  shippingAddress: Address | null
  billingAddress: Address | null
  sameAsShipping: boolean
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
  paymentDetails: PaymentDetails | null
  orderId: string | null
  orderDate: Date | null
  estimatedDelivery: Date | null
}

interface CheckoutContextType {
  state: CheckoutState
  setStep: (step: CheckoutState["step"]) => void
  setShippingAddress: (address: Address) => void
  setBillingAddress: (address: Address) => void
  setSameAsShipping: (same: boolean) => void
  setShippingMethod: (method: ShippingMethod) => void
  setPaymentMethod: (method: PaymentMethod) => void
  setPaymentDetails: (details: PaymentDetails) => void
  processOrder: () => Promise<void>
  resetCheckout: () => void
  shippingCost: number
  tax: number
}

const defaultCheckoutState: CheckoutState = {
  step: "shipping",
  shippingAddress: null,
  billingAddress: null,
  sameAsShipping: true,
  shippingMethod: "standard",
  paymentMethod: "credit_card",
  paymentDetails: null,
  orderId: null,
  orderDate: null,
  estimatedDelivery: null,
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>(defaultCheckoutState)
  const { cartItems, getCartTotal, clearCart } = useCart()
  const router = useRouter()

  // Load checkout state from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCheckout = localStorage.getItem("checkout")
      if (storedCheckout) {
        try {
          setState(JSON.parse(storedCheckout))
        } catch (error) {
          console.error("Failed to parse checkout from localStorage:", error)
        }
      }
    }
  }, [])

  // Save checkout state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("checkout", JSON.stringify(state))
    }
  }, [state])

  // Memoize all state setters to prevent unnecessary re-renders
  const setStep = useCallback((step: CheckoutState["step"]) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const setShippingAddress = useCallback((address: Address) => {
    setState((prev) => ({ ...prev, shippingAddress: address }))
  }, [])

  const setBillingAddress = useCallback((address: Address) => {
    setState((prev) => ({ ...prev, billingAddress: address }))
  }, [])

  const setSameAsShipping = useCallback((same: boolean) => {
    setState((prev) => ({ ...prev, sameAsShipping: same }))
  }, [])

  const setShippingMethod = useCallback((method: ShippingMethod) => {
    setState((prev) => ({ ...prev, shippingMethod: method }))
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setState((prev) => ({ ...prev, paymentMethod: method }))
  }, [])

  const setPaymentDetails = useCallback((details: PaymentDetails) => {
    setState((prev) => ({ ...prev, paymentDetails: details }))
  }, [])

  const processOrder = useCallback(async () => {
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderId = generateOrderId()
    const orderDate = new Date()

    // Calculate estimated delivery date based on shipping method
    const estimatedDelivery = new Date(orderDate)
    if (state.shippingMethod === "standard") {
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)
    } else if (state.shippingMethod === "express") {
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 3)
    } else if (state.shippingMethod === "overnight") {
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 1)
    }

    setState((prev) => ({
      ...prev,
      step: "confirmation",
      orderId,
      orderDate,
      estimatedDelivery,
    }))

    // Clear the cart after successful order
    clearCart()

    // Navigate to confirmation page
    router.push("/checkout/confirmation")
  }, [state.shippingMethod, clearCart, router])

  const resetCheckout = useCallback(() => {
    setState(defaultCheckoutState)
  }, [])

  // Calculate shipping cost based on shipping method
  const shippingCost =
    state.shippingMethod === "standard"
      ? 5.0
      : state.shippingMethod === "express"
        ? 12.0
        : state.shippingMethod === "overnight"
          ? 25.0
          : 0

  // Calculate tax (8.5%)
  const tax = getCartTotal() * 0.085

  return (
    <CheckoutContext.Provider
      value={{
        state,
        setStep,
        setShippingAddress,
        setBillingAddress,
        setSameAsShipping,
        setShippingMethod,
        setPaymentMethod,
        setPaymentDetails,
        processOrder,
        resetCheckout,
        shippingCost,
        tax,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
