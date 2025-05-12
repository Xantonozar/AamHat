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
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#295A43] dark:text-white">
            {t("exploreMangoes")}
          </h1>
          <p className="text-lg text-center mb-8 text-[#295A43]/80 dark:text-gray-300 max-w-3xl mx-auto">
            {t("discoverMangoes")}
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-[#295A43] text-white py-2 px-4 rounded-lg dark:bg-[#FDBE02] dark:text-[#295A43]"
            >
              {isFilterOpen ? t("hideFilters") : t("showFilters")}
            </button>
          </div>

          {/* Filters */}
          <motion.div
            className={`lg:w-1/4 bg-white p-6 rounded-xl shadow-md ${isFilterOpen ? "block" : "hidden lg:block"} dark:bg-[#295A43]`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-6 text-[#295A43] dark:text-white">{t("filters")}</h2>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">{t("priceRange")}</h3>
              <Slider
                defaultValue={[0, 30]}
                max={30}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">{t("category")}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="ml-2 text-gray-700 dark:text-gray-300">
                      {t("category")} {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Origins */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">{t("origin")}</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {origins.map((origin) => (
                  <div key={origin} className="flex items-center">
                    <Checkbox
                      id={`origin-${origin}`}
                      checked={selectedOrigins.includes(origin)}
                      onCheckedChange={() => handleOriginChange(origin)}
                    />
                    <Label htmlFor={`origin-${origin}`} className="ml-2 text-gray-700 dark:text-gray-300">
                      {origin}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#295A43] dark:text-white">{t("sortBy")}</h3>
              <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="sort-default" />
                  <Label htmlFor="sort-default" className="dark:text-gray-300">
                    {t("default")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-asc" id="sort-price-asc" />
                  <Label htmlFor="sort-price-asc" className="dark:text-gray-300">
                    {t("priceLowToHigh")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-desc" id="sort-price-desc" />
                  <Label htmlFor="sort-price-desc" className="dark:text-gray-300">
                    {t("priceHighToLow")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="name-asc" id="sort-name-asc" />
                  <Label htmlFor="sort-name-asc" className="dark:text-gray-300">
                    {t("nameAToZ")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="name-desc" id="sort-name-desc" />
                  <Label htmlFor="sort-name-desc" className="dark:text-gray-300">
                    {t("nameZToA")}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t("noProductsFound")}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t("tryAdjustingFilters")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
