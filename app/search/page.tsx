"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/search-bar"
import ProductCard from "@/components/product-card"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.origin.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )
        setSearchResults(results)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#295A43] dark:text-white">Search Mangoes</h1>
        <SearchBar />
      </div>

      {query && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#295A43] dark:text-white mb-2">
            Search results for: <span className="font-bold">"{query}"</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {isLoading ? "Searching..." : `Found ${searchResults.length} results`}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-xl h-80 animate-pulse dark:bg-[#295A43]"></div>
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg dark:bg-[#295A43]">
          <h3 className="text-xl font-semibold mb-2 text-[#295A43] dark:text-white">No results found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find any mangoes matching your search for "{query}".
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Try using different keywords or browse our collection of mangoes.
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-300">Enter a search term to find mangoes.</p>
        </div>
      )}
    </div>
  )
}
