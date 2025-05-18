"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ProductCard from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import { products } from "@/data/products"
import { useTranslation } from "@/context/translation-context"
import { Filter, X } from "lucide-react"

export default function MangoesPage() {
  const { t } = useTranslation()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 30])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<string>("default")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get unique origins
  const origins = Array.from(new Set(products.map((product) => product.origin)))

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Prevent body scroll when filter sidebar is open on mobile
  useEffect(() => {
    if (isFilterOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isFilterOpen])

  useEffect(() => {
    let filtered = [...products]

    // Filter by price
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by origin
    if (selectedOrigins.length > 0) {
      filtered = filtered.filter((product) => selectedOrigins.includes(product.origin))
    }

    // Sort products
    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOrder === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOrder === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    }

    setFilteredProducts(filtered)
  }, [priceRange, selectedCategories, selectedOrigins, sortOrder])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleOriginChange = (origin: string) => {
    setSelectedOrigins((prev) => {
      if (prev.includes(origin)) {
        return prev.filter((o) => o !== origin)
      } else {
        return [...prev, origin]
      }
    })
  }

  return (
    <div className="dark:bg-[#1D3F2F] dark:text-white">
      <div className="container mx-auto py-6 sm:py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 text-[#295A43] dark:text-white">
            {t("exploreMangoes")}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-center mb-4 sm:mb-6 md:mb-8 text-[#295A43]/80 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t("discoverMangoes")}
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8 md:mb-12 px-4">
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden px-4 mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center bg-[#295A43] text-white py-2 px-4 rounded-lg dark:bg-[#FDBE02] dark:text-[#295A43] text-sm sm:text-base"
            >
              <Filter className="w-4 h-4 mr-2" />
              {isFilterOpen ? t("hideFilters") : t("showFilters")}
            </button>
          </div>

          {/* Filters - Mobile Overlay */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black lg:hidden z-40"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Filters - Sidebar */}
          <motion.div
            className={`fixed top-0 left-0 bottom-0 w-72 lg:w-1/4 lg:static bg-white p-4 sm:p-5 md:p-6 rounded-none lg:rounded-xl shadow-xl lg:shadow-md overflow-y-auto z-50 ${
              isFilterOpen ? "block" : "hidden lg:block"
            } dark:bg-[#295A43]`}
            initial={isFilterOpen ? { x: "-100%" } : { opacity: 0, x: -20 }}
            animate={isFilterOpen ? { x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#295A43] dark:text-white">{t("filters")}</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <X className="w-5 h-5 text-[#295A43] dark:text-white" />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#295A43] dark:text-white">
                {t("priceRange")}
              </h3>
              <Slider
                defaultValue={[0, 30]}
                max={30}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#295A43] dark:text-white">
                {t("category")}
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                    >
                      {t("category")} {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Origins */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#295A43] dark:text-white">
                {t("origin")}
              </h3>
              <div className="space-y-2 max-h-36 sm:max-h-48 overflow-y-auto pr-2">
                {origins.map((origin) => (
                  <div key={origin} className="flex items-center">
                    <Checkbox
                      id={`origin-${origin}`}
                      checked={selectedOrigins.includes(origin)}
                      onCheckedChange={() => handleOriginChange(origin)}
                    />
                    <Label
                      htmlFor={`origin-${origin}`}
                      className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                    >
                      {origin}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#295A43] dark:text-white">
                {t("sortBy")}
              </h3>
              <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="default" id="sort-default" />
                  <Label htmlFor="sort-default" className="text-sm sm:text-base dark:text-gray-300">
                    {t("default")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="price-asc" id="sort-price-asc" />
                  <Label htmlFor="sort-price-asc" className="text-sm sm:text-base dark:text-gray-300">
                    {t("priceLowToHigh")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="price-desc" id="sort-price-desc" />
                  <Label htmlFor="sort-price-desc" className="text-sm sm:text-base dark:text-gray-300">
                    {t("priceHighToLow")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="name-asc" id="sort-name-asc" />
                  <Label htmlFor="sort-name-asc" className="text-sm sm:text-base dark:text-gray-300">
                    {t("nameAToZ")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="name-desc" id="sort-name-desc" />
                  <Label htmlFor="sort-name-desc" className="text-sm sm:text-base dark:text-gray-300">
                    {t("nameZToA")}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Apply Filters Button (Mobile Only) */}
            <div className="mt-6 lg:hidden">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-[#FDBE02] text-[#295A43] font-medium py-2 px-4 rounded-lg"
              >
                {t("applyFilters")}
              </button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:w-3/4 px-4 lg:px-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">{t("noProductsFound")}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t("tryAdjustingFilters")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="h-full"
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="h-full bg-white dark:bg-[#295A43] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-[#3a7057]">
                      <ProductCard product={product} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
