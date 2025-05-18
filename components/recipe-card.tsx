import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Recipe } from "@/types/recipe"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-[#295A43] dark:border-[#3a7057]">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg?height=300&width=500"}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="inline-block rounded-full bg-[#FDBE02] px-2 py-1 text-xs font-semibold text-[#295A43]">
              {recipe.difficulty}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-[#295A43] dark:text-white">{recipe.title}</h3>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{recipe.prepTime + recipe.cookTime} mins</span>
            <span>{recipe.servings} servings</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
