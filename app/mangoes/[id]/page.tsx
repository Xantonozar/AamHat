"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingCart, Star, Info, Truck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductReviews } from "@/components/product-reviews"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useTranslation } from "@/context/translation-context"
import { products } from "@/data/products"
import { reviews } from "@/data/reviews"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId)
  const productReviews = reviews.filter((review) => review.productId === productId)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { t } = useTranslation()

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center dark:bg-[#1D3F2F] dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-[#295A43] dark:text-white">Product Not Found</h1>
        <p className="mb-8">The mango you're looking for doesn't exist.</p>
        <Link href="/mangoes">
          <Button className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("continueShopping")}
          </Button>
        </Link>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  // Mock multiple product images
  const productImages = [
    product.image,
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ]

  return (
    <div className="container mx-auto px-4 py-24 dark:bg-[#1D3F2F] dark:text-white">
      <Link href="/mangoes" className="inline-flex items-center text-[#295A43] dark:text-white mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("continueShopping")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-xl overflow-hidden shadow-md dark:bg-[#295A43]">
            <div className="relative aspect-square">
              <Image
                src={productImages[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex mt-4 space-x-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                  activeImage === index ? "border-[#FDBE02]" : "border-transparent"
                }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-[#295A43] dark:text-white mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-[#FDBE02] text-[#FDBE02]"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <Link href="#reviews" className="text-gray-600 dark:text-gray-300 hover:underline">
              {product.rating} ({product.reviews} reviews)
            </Link>
          </div>

          <div className="text-2xl font-bold text-[#295A43] dark:text-[#FDBE02] mb-6">${product.price.toFixed(2)}</div>

          <p className="text-gray-700 dark:text-gray-300 mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#1D3F2F]">
              <div className="font-medium text-[#295A43] dark:text-white mb-2">{t("origin")}</div>
              <div className="text-gray-700 dark:text-gray-300">{product.origin}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#1D3F2F]">
              <div className="font-medium text-[#295A43] dark:text-white mb-2">{t("category")}</div>
              <div className="text-gray-700 dark:text-gray-300">
                {t("category")} {product.category}
              </div>
            </div>
          </div>

          <div className="flex items-center mb-8 text-gray-700 dark:text-gray-300">
            <div className="flex items-center mr-6">
              <Truck className="w-5 h-5 mr-2 text-[#295A43] dark:text-[#FDBE02]" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#295A43] dark:text-[#FDBE02]" />
              <span>Delivery in 2-3 days</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="font-medium text-[#295A43] dark:text-white mb-2">{t("quantity")}</div>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-l-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-200 dark:border-gray-700">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-r-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t("addToCart")}
            </Button>
            <Button
              onClick={handleToggleWishlist}
              variant="outline"
              className={`flex-1 font-bold py-3 ${
                inWishlist
                  ? "bg-[#FFF8B0] border-[#FDBE02] text-[#295A43] dark:bg-[#295A43] dark:border-[#FDBE02] dark:text-[#FDBE02]"
                  : "border-[#295A43] text-[#295A43] dark:border-gray-400 dark:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 mr-2 ${inWishlist ? "fill-[#FFA94D] text-[#FFA94D]" : ""}`} />
              {inWishlist ? t("removeFromWishlist") : t("addToWishlist")}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b dark:border-gray-700 bg-transparent">
            <TabsTrigger
              value="details"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
            >
              Nutritional Info
            </TabsTrigger>
            <TabsTrigger
              value="storage"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
            >
              Storage & Ripeness
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              id="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#FDBE02]"
            >
              Reviews ({productReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Our {product.name} mangoes are carefully selected and harvested at the peak of ripeness to ensure
                  maximum flavor and quality. Each mango is hand-picked and inspected to meet our strict standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-medium">Origin</span>
                    <span className="text-gray-700 dark:text-gray-300">{product.origin}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-medium">Category</span>
                    <span className="text-gray-700 dark:text-gray-300">Category {product.category}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-medium">Weight</span>
                    <span className="text-gray-700 dark:text-gray-300">Approx. 300-400g per mango</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="font-medium">Season</span>
                    <span className="text-gray-700 dark:text-gray-300">May to August</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Shipping</span>
                    <span className="text-gray-700 dark:text-gray-300">Temperature controlled</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="pt-6">
            {product.nutritionalInfo ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Nutritional Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Mangoes are not only delicious but also packed with essential nutrients. Here's what you'll get in a
                    100g serving of our {product.name} mangoes:
                  </p>
                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <span className="font-medium">Calories</span>
                      <span className="text-gray-700 dark:text-gray-300">{product.nutritionalInfo.calories} kcal</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <span className="font-medium">Protein</span>
                      <span className="text-gray-700 dark:text-gray-300">{product.nutritionalInfo.protein}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <span className="font-medium">Carbohydrates</span>
                      <span className="text-gray-700 dark:text-gray-300">{product.nutritionalInfo.carbs}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                      <span className="font-medium">Sugar</span>
                      <span className="text-gray-700 dark:text-gray-300">{product.nutritionalInfo.sugar}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fiber</span>
                      <span className="text-gray-700 dark:text-gray-300">{product.nutritionalInfo.fiber}g</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Health Benefits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Rich in vitamins A and C, supporting immune function and skin health</li>
                    <li>Contains antioxidants that help protect cells from damage</li>
                    <li>Good source of dietary fiber, promoting digestive health</li>
                    <li>Contains enzymes that aid digestion</li>
                    <li>Low in calories and fat, making them a healthy snack option</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                Nutritional information not available for this product.
              </p>
            )}
          </TabsContent>

          <TabsContent value="storage" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Storage Instructions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {product.storageInfo || "Store at room temperature until ripe, then refrigerate for up to 5 days."}
                </p>
                <div className="bg-[#FFF8B0]/30 p-4 rounded-lg mt-4 dark:bg-[#FDBE02]/10">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-[#295A43] mt-0.5 mr-2 dark:text-[#FDBE02]" />
                    <p className="text-[#295A43] dark:text-gray-300">
                      To speed up ripening, place mangoes in a paper bag at room temperature. To slow down ripening,
                      refrigerate ripe mangoes.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#295A43] dark:text-white">Ripeness Guide</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {product.ripeness || "Ready to eat when slightly soft to the touch and emitting a sweet aroma."}
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-green-500 mt-1 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-[#295A43] dark:text-white">Firm - Not Ready</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hard to the touch with a green color. Leave at room temperature to ripen.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mt-1 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-[#295A43] dark:text-white">Slightly Soft - Almost Ready</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Yields slightly to pressure with yellow color. Ready in 1-2 days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-[#295A43] dark:text-white">Soft - Ready to Eat</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Yields to gentle pressure with yellow-orange color and sweet aroma. Perfect for eating now.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <ProductReviews productId={product.id} reviews={productReviews} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[#295A43] dark:text-white mb-8">{t("youMayAlsoLike")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products
            .filter((p) => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:bg-[#295A43]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link href={`/mangoes/${relatedProduct.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#295A43] dark:text-white mb-1">{relatedProduct.name}</h3>
                    <div className="text-lg font-bold text-[#295A43] dark:text-[#FDBE02]">
                      ${relatedProduct.price.toFixed(2)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
