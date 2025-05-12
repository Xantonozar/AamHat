"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "@/components/product-card"
import { products } from "@/data/products"
import "keen-slider/keen-slider.min.css"

export function FeaturedProducts() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.5,
          spacing: 16,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 3.5,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4.5,
          spacing: 24,
        },
      },
    },
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Get featured products (those with highest ratings)
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)

  return (
    <div className="w-screen relative overflow-hidden bg-[#FFF8B0] dark:bg-[#295A43] py-16" ref={containerRef}>
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#295A43] dark:text-white">
            Featured Mangoes
          </h2>
          <p className="text-xl text-center mb-8 text-[#295A43]/80 dark:text-gray-300 max-w-2xl mx-auto">
            Our most popular varieties, handpicked for exceptional taste and quality
          </p>
        </motion.div>
      </div>

      <div className="relative px-4">
        <div ref={sliderRef} className="keen-slider">
          {featuredProducts.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 dark:bg-[#1D3F2F] dark:hover:bg-[#295A43]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-[#295A43] dark:text-white" />
        </button>

        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 dark:bg-[#1D3F2F] dark:hover:bg-[#295A43]"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-[#295A43] dark:text-white" />
        </button>
      </div>
    </div>
  )
}
