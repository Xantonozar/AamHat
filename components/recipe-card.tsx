"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Users, ChefHat } from "lucide-react"
import type { Recipe } from "@/types/recipe"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <motion.div
      className="card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative overflow-hidden">
        <Link href={`/recipes/${recipe.id}`}>
          <div className="aspect-video relative">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
        </Link>
        <div className="absolute top-2 right-2 bg-[#FDBE02] px-2 py-1 rounded-full text-xs font-medium text-[#295A43]">
          {recipe.difficulty}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col dark:bg-[#1D3F2F] dark:text-white">
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="font-bold text-lg text-[#295A43] mb-1 dark:text-white">{recipe.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 dark:text-gray-300 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center justify-between mt-auto text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center">
            <ChefHat className="w-4 h-4 mr-1" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
