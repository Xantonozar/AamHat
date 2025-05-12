// Generate a random order ID
export function generateOrderId(): string {
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `MM-${timestamp}-${random}`
}

// Format credit card number with spaces
export function formatCreditCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(" ")
  } else {
    return value
  }
}

// Format expiry date (MM/YY)
export function formatExpiryDate(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

  if (v.length >= 3) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`
  }

  return value
}

// Validate credit card number using Luhn algorithm
export function validateCreditCard(number: string): boolean {
  // Remove spaces and non-numeric characters
  const cardNumber = number.replace(/\D/g, "")

  if (cardNumber.length < 13 || cardNumber.length > 19) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  // Loop through values starting from the rightmost digit
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cardNumber.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

// Format phone number
export function formatPhoneNumber(value: string): string {
  const v = value.replace(/\D/g, "")

  if (v.length <= 3) {
    return v
  } else if (v.length <= 6) {
    return `(${v.slice(0, 3)}) ${v.slice(3)}`
  } else {
    return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6, 10)}`
  }
}

// Format postal code
export function formatPostalCode(value: string): string {
  return value.replace(/[^\d-]/g, "")
}

// Get shipping method label
export function getShippingMethodLabel(method: string): string {
  switch (method) {
    case "standard":
      return "Standard Shipping (3-5 business days)"
    case "express":
      return "Express Shipping (2-3 business days)"
    case "overnight":
      return "Overnight Shipping (1 business day)"
    default:
      return "Standard Shipping"
  }
}

// Format date to readable string
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
