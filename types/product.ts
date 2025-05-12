export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  origin: string
  inStock: boolean
  rating: number
  reviews: number
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    sugar: number
    fiber: number
  }
  storageInfo?: string
  ripeness?: string
}
