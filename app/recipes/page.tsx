import { recipes } from "@/data/recipes"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"

export default function RecipesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-[#295A43] dark:text-white md:text-4xl">Mango Recipes</h1>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
          Discover delicious ways to enjoy mangoes with our collection of recipes, from sweet desserts to savory dishes.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 dark:border-gray-700 dark:bg-[#1a3528] dark:text-white dark:placeholder-gray-400"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-1 dark:border-gray-700 dark:text-white">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#FFF8B0] px-3 py-1 text-sm text-[#295A43] dark:bg-[#665e45] dark:text-white">
              Easy
              <X className="h-4 w-4 cursor-pointer" />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#FFF8B0] px-3 py-1 text-sm text-[#295A43] dark:bg-[#665e45] dark:text-white">
              Quick
              <X className="h-4 w-4 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
