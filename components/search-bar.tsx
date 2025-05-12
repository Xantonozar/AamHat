"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle clicks outside the search component
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.origin.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 5))
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setIsOpen(false)
    }
  }

  const handleSuggestionClick = (productId: string) => {
    router.push(`/mangoes/${productId}`)
    setSearchTerm("")
    setIsOpen(false)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSuggestions([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search for mangoes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10 pl-10 py-2 w-full rounded-full border-2 border-[#FDBE02] focus:border-[#FFA94D] focus:ring-[#FFA94D] dark:border-[#FDBE02] dark:bg-[#1D3F2F] dark:text-white"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 h-5 w-5" />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <Button
          type="submit"
          className="absolute right-0 top-0 h-full rounded-r-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] px-4"
        >
          <Search className="h-5 w-5" />
        </Button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-[#295A43]">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-[#1D3F2F] transition-colors"
                onClick={() => handleSuggestionClick(product.id)}
              >
                <div className="font-medium text-[#295A43] dark:text-white">{product.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300 truncate">{product.description}</div>
              </li>
            ))}
          </ul>
          <div className="p-2 bg-gray-50 dark:bg-[#1D3F2F]">
            <Button onClick={handleSearch} className="w-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] text-sm">
              See all results for &quot;{searchTerm}&quot;
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
