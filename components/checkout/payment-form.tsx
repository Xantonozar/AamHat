"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatCreditCardNumber, formatExpiryDate } from "@/lib/checkout-utils"
import { CreditCard, ShoppingCartIcon as Paypal, Apple } from "lucide-react"
import type { PaymentMethod, PaymentDetails } from "@/context/checkout-context"

interface PaymentFormProps {
  paymentMethod: PaymentMethod
  paymentDetails: PaymentDetails | null
  onPaymentMethodChange: (method: PaymentMethod) => void
  onPaymentDetailsChange: (details: PaymentDetails) => void
}

export function PaymentForm({
  paymentMethod,
  paymentDetails,
  onPaymentMethodChange,
  onPaymentDetailsChange,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentDetails>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    ...paymentDetails,
  })

  useEffect(() => {
    if (paymentDetails) {
      setFormData(paymentDetails)
    }
  }, [paymentDetails])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let formattedValue = value

    if (name === "cardNumber") {
      formattedValue = formatCreditCardNumber(value)
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData((prev) => {
      const newData = { ...prev, [name]: formattedValue }
      onPaymentDetailsChange(newData)
      return newData
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#295A43] dark:text-white">Payment Method</h3>

      <RadioGroup value={paymentMethod} onValueChange={(value) => onPaymentMethodChange(value as PaymentMethod)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-[#1D3F2F] ${paymentMethod === "credit_card" ? "border-[#FDBE02] bg-[#FFF8B0]/20 dark:bg-[#FDBE02]/10" : ""}`}
          >
            <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
            <CreditCard className={`h-8 w-8 ${paymentMethod === "credit_card" ? "text-[#FDBE02]" : "text-gray-400"}`} />
            <Label htmlFor="credit_card" className="cursor-pointer">
              Credit Card
            </Label>
          </div>

          <div
            className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-[#1D3F2F] ${paymentMethod === "paypal" ? "border-[#FDBE02] bg-[#FFF8B0]/20 dark:bg-[#FDBE02]/10" : ""}`}
          >
            <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
            <Paypal className={`h-8 w-8 ${paymentMethod === "paypal" ? "text-[#FDBE02]" : "text-gray-400"}`} />
            <Label htmlFor="paypal" className="cursor-pointer">
              PayPal
            </Label>
          </div>

          <div
            className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-[#1D3F2F] ${paymentMethod === "apple_pay" ? "border-[#FDBE02] bg-[#FFF8B0]/20 dark:bg-[#FDBE02]/10" : ""}`}
          >
            <RadioGroupItem value="apple_pay" id="apple_pay" className="sr-only" />
            <Apple className={`h-8 w-8 ${paymentMethod === "apple_pay" ? "text-[#FDBE02]" : "text-gray-400"}`} />
            <Label htmlFor="apple_pay" className="cursor-pointer">
              Apple Pay
            </Label>
          </div>
        </div>
      </RadioGroup>

      {paymentMethod === "credit_card" && (
        <div className="space-y-4 mt-6 border-t pt-6 dark:border-gray-600">
          <h4 className="font-medium text-[#295A43] dark:text-white">Card Details</h4>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={4}
                required
                className="mt-1"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <div className="mt-6 border-t pt-6 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-300">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {paymentMethod === "apple_pay" && (
        <div className="mt-6 border-t pt-6 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-300">
            You will be prompted to confirm your payment with Apple Pay.
          </p>
        </div>
      )}
    </div>
  )
}
