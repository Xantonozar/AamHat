export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: "easy" | "medium" | "hard"
  ingredients: string[]
  instructions: string[]
  relatedProducts: string[]
  tags: string[]
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
}
