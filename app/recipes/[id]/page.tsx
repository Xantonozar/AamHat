"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Users, ChefHat, Printer, Share2, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { recipes } from "@/data/recipes"
import { products } from "@/data/products"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"

export default function RecipeDetailPage() {
  const params = useParams()
  const recipeId = params.id as string
  const recipe = recipes.find((r) => r.id === recipeId)

  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [recipeId])

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-24 text-center dark:bg-[#1D3F2F] dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-[#295A43] dark:text-white">Recipe Not Found</h1>
        <p className="mb-8">The recipe you're looking for doesn't exist.</p>
        <Link href="/recipes">
          <Button className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Button>
        </Link>
      </div>
    )
  }

  // Get related products
  const relatedProducts = products.filter((product) => recipe.relatedProducts.includes(product.id))

  // Get similar recipes (excluding current recipe)
  const similarRecipes = recipes
    .filter((r) => r.id !== recipe.id && r.tags.some((tag) => recipe.tags.includes(tag)))
    .slice(0, 3)

  const totalTime = recipe.prepTime + recipe.cookTime

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <Link href="/recipes" className="inline-flex items-center text-[#295A43] dark:text-white mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Recipes
      </Link>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[#295A43] dark:text-white mb-4">{recipe.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{recipe.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full dark:bg-[#295A43]">
              <Clock className="w-4 h-4 mr-2 text-[#FDBE02]" />
              <span className="text-sm">Total: {totalTime} min</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full dark:bg-[#295A43]">
              <Clock className="w-4 h-4 mr-2 text-[#FDBE02]" />
              <span className="text-sm">Prep: {recipe.prepTime} min</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full dark:bg-[#295A43]">
              <Clock className="w-4 h-4 mr-2 text-[#FDBE02]" />
              <span className="text-sm">Cook: {recipe.cookTime} min</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full dark:bg-[#295A43]">
              <Users className="w-4 h-4 mr-2 text-[#FDBE02]" />
              <span className="text-sm">Serves: {recipe.servings}</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full dark:bg-[#295A43]">
              <ChefHat className="w-4 h-4 mr-2 text-[#FDBE02]" />
              <span className="text-sm capitalize">Difficulty: {recipe.difficulty}</span>
            </div>
          </div>

          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" priority />
          </div>

          <div className="flex gap-4 mb-8">
            <Button variant="outline" onClick={handlePrint} className="flex items-center">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="w-full justify-start border-b dark:border-gray-700 bg-transparent">
              <TabsTrigger
                value="ingredients"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="instructions"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
              >
                Instructions
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
              >
                Nutrition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="pt-6">
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-[#FDBE02] rounded-full mr-3 flex-shrink-0 mt-0.5"></span>
                    <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="instructions" className="pt-6">
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#295A43] text-white rounded-full mr-3 flex-shrink-0 text-sm dark:bg-[#FDBE02] dark:text-[#295A43]">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="nutrition" className="pt-6">
              {recipe.nutritionalInfo ? (
                <div className="bg-gray-50 p-6 rounded-lg dark:bg-[#295A43]">
                  <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">Nutritional Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Per serving:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white p-3 rounded-lg text-center dark:bg-[#1D3F2F]">
                      <div className="text-lg font-bold text-[#FDBE02]">{recipe.nutritionalInfo.calories}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center dark:bg-[#1D3F2F]">
                      <div className="text-lg font-bold text-[#FDBE02]">{recipe.nutritionalInfo.protein}g</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Protein</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center dark:bg-[#1D3F2F]">
                      <div className="text-lg font-bold text-[#FDBE02]">{recipe.nutritionalInfo.carbs}g</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Carbs</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center dark:bg-[#1D3F2F]">
                      <div className="text-lg font-bold text-[#FDBE02]">{recipe.nutritionalInfo.fat}g</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Fat</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center dark:bg-[#1D3F2F]">
                      <div className="text-lg font-bold text-[#FDBE02]">{recipe.nutritionalInfo.fiber}g</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Fiber</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Nutritional information not available for this recipe.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24 dark:bg-[#295A43]">
            <h3 className="text-xl font-semibold mb-6 text-[#295A43] dark:text-white">Ingredients You'll Need</h3>

            {relatedProducts.length > 0 && (
              <div className="space-y-4 mb-6">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 border-b pb-4 dark:border-gray-700">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/mangoes/${product.id}`}
                        className="font-medium text-[#295A43] hover:underline dark:text-white"
                      >
                        {product.name}
                      </Link>
                      <div className="text-sm text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToWishlist(product)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#1D3F2F] dark:hover:bg-gray-700"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 rounded-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-[#FFF8B0]/30 p-4 rounded-lg dark:bg-[#FDBE02]/10">
              <h4 className="font-medium text-[#295A43] mb-2 dark:text-white">Chef's Tip</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                For the best flavor, use ripe mangoes that yield slightly to gentle pressure and have a sweet aroma at
                the stem end.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Similar Recipes */}
      {similarRecipes.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#295A43] dark:text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarRecipes.map((similarRecipe, index) => (
              <motion.div
                key={similarRecipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <RecipeCard recipe={similarRecipe} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { RecipeCard } from "@/components/recipe-card"
