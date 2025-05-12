"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    ...address,
  })

  useEffect(() => {
    if (address) {
      setFormData(address)
    }
  }, [address])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let formattedValue = value

    if (name === "phone") {
      formattedValue = formatPhoneNumber(value)
    } else if (name === "postalCode") {
      formattedValue = formatPostalCode(value)
    }

    setFormData((prev) => {
      const newData = { ...prev, [name]: formattedValue }
      onAddressChange(newData)
      return newData
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      onAddressChange(newData)
      return newData
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#295A43] dark:text-white">{title}</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="123 Main St"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2 || ""}
            onChange={handleChange}
            placeholder="Apt 4B"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
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
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="10001"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
              <SelectTrigger id="country" className="mt-1">
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
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
