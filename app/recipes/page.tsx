"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RecipeCard } from "@/components/recipe-card"
import { recipes } from "@/data/recipes"

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get unique tags
  const allTags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)))

  // Get unique difficulties
  const difficulties = ["easy", "medium", "hard"]

  useEffect(() => {
    let filtered = [...recipes]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((recipe) => recipe.tags.some((tag) => selectedTags.includes(tag)))
    }

    // Filter by difficulty
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter((recipe) => selectedDifficulty.includes(recipe.difficulty))
    }

    setFilteredRecipes(filtered)
  }, [searchTerm, selectedTags, selectedDifficulty])

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty((prev) => {
      if (prev.includes(difficulty)) {
        return prev.filter((d) => d !== difficulty)
      } else {
        return [...prev, difficulty]
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#295A43] dark:text-white">
          Mango Recipes
        </h1>
        <p className="text-lg text-center mb-8 text-[#295A43]/80 dark:text-gray-300 max-w-3xl mx-auto">
          Discover delicious recipes featuring our premium mangoes
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 w-full rounded-full border-2 border-[#FDBE02] focus:border-[#FFA94D] focus:ring-[#FFA94D] dark:border-[#FDBE02] dark:bg-[#1D3F2F] dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-[#295A43] text-white py-2 px-4 rounded-lg dark:bg-[#FDBE02] dark:text-[#295A43] flex items-center justify-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filters */}
        <motion.div
          className={`lg:w-1/4 bg-white p-6 rounded-xl shadow-md ${isFilterOpen ? "block" : "hidden lg:block"} dark:bg-[#295A43]`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-6 text-[#295A43] dark:text-white">Filters</h2>

          {/* Difficulty */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">Difficulty</h3>
            <div className="space-y-2">
              {difficulties.map((difficulty) => (
                <div key={difficulty} className="flex items-center">
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={selectedDifficulty.includes(difficulty)}
                    onCheckedChange={() => handleDifficultyChange(difficulty)}
                  />
                  <Label
                    htmlFor={`difficulty-${difficulty}`}
                    className="ml-2 text-gray-700 dark:text-gray-300 capitalize"
                  >
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">Tags</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allTags.map((tag) => (
                <div key={tag} className="flex items-center">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagChange(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recipes Grid */}
        <div className="lg:w-3/4">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">No recipes found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
