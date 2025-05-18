"use client"

import { useCallback } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { ShippingMethod } from "@/context/checkout-context"

interface ShippingMethodSelectorProps {
  selectedMethod: ShippingMethod
  onMethodChange: (method: ShippingMethod) => void
}

export function ShippingMethodSelector({ selectedMethod, onMethodChange }: ShippingMethodSelectorProps) {
  // Memoize the value change handler
  const handleValueChange = useCallback(
    (value: string) => {
      onMethodChange(value as ShippingMethod)
    },
    [onMethodChange],
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#295A43] dark:text-white">Shipping Method</h3>

      <RadioGroup value={selectedMethod} onValueChange={handleValueChange}>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border p-3 rounded-md dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1D3F2F] cursor-pointer">
            <RadioGroupItem value="standard" id="standard" />
            <div className="flex-1">
              <Label htmlFor="standard" className="font-medium cursor-pointer">
                Standard Shipping
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">3-5 business days</p>
            </div>
            <div className="font-semibold text-[#295A43] dark:text-[#FDBE02]">$5.00</div>
          </div>

          <div className="flex items-center space-x-2 border p-3 rounded-md dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1D3F2F] cursor-pointer">
            <RadioGroupItem value="express" id="express" />
            <div className="flex-1">
              <Label htmlFor="express" className="font-medium cursor-pointer">
                Express Shipping
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">2-3 business days</p>
            </div>
            <div className="font-semibold text-[#295A43] dark:text-[#FDBE02]">$12.00</div>
          </div>

          <div className="flex items-center space-x-2 border p-3 rounded-md dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1D3F2F] cursor-pointer">
            <RadioGroupItem value="overnight" id="overnight" />
            <div className="flex-1">
              <Label htmlFor="overnight" className="font-medium cursor-pointer">
                Overnight Shipping
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Next business day</p>
            </div>
            <div className="font-semibold text-[#295A43] dark:text-[#FDBE02]">$25.00</div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
