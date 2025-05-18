import Image from "next/image"
import { notFound } from "next/navigation"
import { recipes } from "@/data/recipes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, ChefHat, Printer, Share2, BookmarkPlus } from "lucide-react"

interface RecipePageProps {
  params: {
    id: string
  }
}

export default function RecipePage({ params }: RecipePageProps) {
  const recipe = recipes.find((r) => r.id === params.id)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
            <Image
              src={recipe.image || "/placeholder.svg?height=500&width=800"}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between">
            <h1 className="text-3xl font-bold text-[#295A43] dark:text-white md:text-4xl">{recipe.title}</h1>
            <div className="mt-2 flex space-x-2 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-300"
              >
                <BookmarkPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-300"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 dark:border-gray-600 dark:text-gray-300"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>

          <p className="mb-6 text-gray-700 dark:text-gray-300">{recipe.description}</p>

          <div className="mb-8 grid grid-cols-3 gap-4 sm:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg bg-[#FFF8B0] p-3 text-center dark:bg-[#665e45]">
              <Clock className="mb-1 h-5 w-5 text-[#295A43] dark:text-white" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Prep Time</span>
              <span className="font-medium text-[#295A43] dark:text-white">{recipe.prepTime} mins</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-[#FFF8B0] p-3 text-center dark:bg-[#665e45]">
              <Clock className="mb-1 h-5 w-5 text-[#295A43] dark:text-white" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Cook Time</span>
              <span className="font-medium text-[#295A43] dark:text-white">{recipe.cookTime} mins</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-[#FFF8B0] p-3 text-center dark:bg-[#665e45]">
              <Clock className="mb-1 h-5 w-5 text-[#295A43] dark:text-white" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Total Time</span>
              <span className="font-medium text-[#295A43] dark:text-white">
                {recipe.prepTime + recipe.cookTime} mins
              </span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-[#FFF8B0] p-3 text-center dark:bg-[#665e45]">
              <Users className="mb-1 h-5 w-5 text-[#295A43] dark:text-white" />
              <span className="text-xs text-gray-600 dark:text-gray-300">Servings</span>
              <span className="font-medium text-[#295A43] dark:text-white">{recipe.servings}</span>
            </div>
          </div>

          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-3 dark:bg-[#295A43]">
              <TabsTrigger value="ingredients" className="dark:data-[state=active]:bg-[#3a7057]">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="instructions" className="dark:data-[state=active]:bg-[#3a7057]">
                Instructions
              </TabsTrigger>
              <TabsTrigger value="notes" className="dark:data-[state=active]:bg-[#3a7057]">
                Notes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="mt-4">
              <Card className="dark:bg-[#295A43] dark:border-[#3a7057]">
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 block h-2 w-2 rounded-full bg-[#FDBE02]"></span>
                        <span className="dark:text-gray-300">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructions" className="mt-4">
              <Card className="dark:bg-[#295A43] dark:border-[#3a7057]">
                <CardContent className="pt-6">
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDBE02] text-sm font-bold text-[#295A43]">
                          {index + 1}
                        </span>
                        <span className="dark:text-gray-300">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <Card className="dark:bg-[#295A43] dark:border-[#3a7057]">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 flex items-center text-lg font-medium text-[#295A43] dark:text-white">
                        <ChefHat className="mr-2 h-5 w-5" />
                        Chef&apos;s Tips
                      </h3>
                      <ul className="list-disc space-y-2 pl-5 dark:text-gray-300">
                        <li>For best results, use ripe mangoes that yield slightly to gentle pressure.</li>
                        <li>If mangoes aren&apos;t in season, you can substitute with frozen mango chunks.</li>
                        <li>Adjust sweetness according to the natural sweetness of your mangoes.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-[#295A43] dark:text-white">Storage Information</h3>
                      <p className="dark:text-gray-300">
                        Store any leftovers in an airtight container in the refrigerator for up to 3 days. This recipe
                        does not freeze well due to the fresh mango content.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="mb-6 dark:bg-[#295A43] dark:border-[#3a7057]">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#295A43] dark:text-white">Nutrition Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <span className="font-medium dark:text-gray-300">Calories</span>
                  <span className="dark:text-gray-300">320 kcal</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <span className="font-medium dark:text-gray-300">Protein</span>
                  <span className="dark:text-gray-300">5g</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <span className="font-medium dark:text-gray-300">Carbs</span>
                  <span className="dark:text-gray-300">45g</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <span className="font-medium dark:text-gray-300">Fat</span>
                  <span className="dark:text-gray-300">12g</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                  <span className="font-medium dark:text-gray-300">Sugar</span>
                  <span className="dark:text-gray-300">28g</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium dark:text-gray-300">Fiber</span>
                  <span className="dark:text-gray-300">3g</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 dark:bg-[#295A43] dark:border-[#3a7057]">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#295A43] dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#FFF8B0] px-3 py-1 text-sm text-[#295A43] dark:bg-[#665e45] dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#295A43] dark:border-[#3a7057]">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#295A43] dark:text-white">You Might Also Like</h3>
              <div className="space-y-4">
                {recipes
                  .filter((r) => r.id !== recipe.id)
                  .slice(0, 3)
                  .map((relatedRecipe) => (
                    <div key={relatedRecipe.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={relatedRecipe.image || "/placeholder.svg?height=64&width=64"}
                          alt={relatedRecipe.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#295A43] dark:text-white">{relatedRecipe.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {relatedRecipe.prepTime + relatedRecipe.cookTime} mins | {relatedRecipe.difficulty}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
