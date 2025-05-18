"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPhoneNumber, formatPostalCode } from "@/lib/checkout-utils"
import type { Address } from "@/context/checkout-context"

interface AddressFormProps {
  title: string
  address: Address | null
  onAddressChange: (address: Address) => void
}

export function AddressForm({ title, address, onAddressChange }: AddressFormProps) {
  // Use a ref to track if this is the initial render
  const initialRenderRef = useRef(true)

  // Use a ref to track if we should call onAddressChange
  const shouldUpdateParentRef = useRef(false)

  const [formData, setFormData] = useState<Address>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    ...(address || {}),
  })

  // Only update local state when address prop changes
  useEffect(() => {
    if (address && JSON.stringify(address) !== JSON.stringify(formData)) {
      setFormData(address)
    }
  }, [address])

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let formattedValue = value

    if (name === "phone") {
      formattedValue = formatPhoneNumber(value)
    } else if (name === "postalCode") {
      formattedValue = formatPostalCode(value)
    }

    setFormData((prev) => {
      const newData = { ...prev, [name]: formattedValue }
      shouldUpdateParentRef.current = true
      return newData
    })
  }, [])

  // Handle select changes
  const handleSelectChange = useCallback((value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, country: value }
      shouldUpdateParentRef.current = true
      return newData
    })
  }, [])

  // Notify parent component of changes, but only when formData changes due to user input
  useEffect(() => {
    // Skip the first render
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      return
    }

    // Only call onAddressChange if the update was triggered by user input
    if (shouldUpdateParentRef.current) {
      onAddressChange(formData)
      shouldUpdateParentRef.current = false
    }
  }, [formData, onAddressChange])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#295A43] dark:text-white">{title}</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor={`${title}-fullName`}>Full Name</Label>
          <Input
            id={`${title}-fullName`}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor={`${title}-addressLine1`}>Address Line 1</Label>
          <Input
            id={`${title}-addressLine1`}
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="123 Main St"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor={`${title}-addressLine2`}>Address Line 2 (Optional)</Label>
          <Input
            id={`${title}-addressLine2`}
            name="addressLine2"
            value={formData.addressLine2 || ""}
            onChange={handleChange}
            placeholder="Apt 4B"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${title}-city`}>City</Label>
            <Input
              id={`${title}-city`}
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`${title}-state`}>State/Province</Label>
            <Input
              id={`${title}-state`}
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="NY"
              required
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${title}-postalCode`}>Postal Code</Label>
            <Input
              id={`${title}-postalCode`}
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="10001"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`${title}-country`}>Country</Label>
            <Select defaultValue={formData.country} onValueChange={handleSelectChange}>
              <SelectTrigger id={`${title}-country`} className="mt-1">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Mexico">Mexico</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor={`${title}-phone`}>Phone Number</Label>
          <Input
            id={`${title}-phone`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            required
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}
