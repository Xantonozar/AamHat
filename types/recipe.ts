export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime: number // in minutes
  cookTime: number // in minutes
  servings: number
  difficulty: string
  image: string
  tags: string[]
  author?: string
  nutritionFacts?: NutritionFacts
  tips?: string[]
  variations?: string[]
  storageInfo?: string
  relatedRecipes?: string[]
  datePublished?: string
  rating?: number
}

export interface NutritionFacts {
  calories: number
  fat: number
  carbs: number
  protein: number
  sugar?: number
  fiber?: number
  sodium?: number
}
