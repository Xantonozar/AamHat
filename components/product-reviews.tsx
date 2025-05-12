"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReviewForm } from "@/components/review-form"
import type { Review } from "@/types/product"

interface ProductReviewsProps {
  productId: string
  reviews: Review[]
}

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([])
  const [filter, setFilter] = useState<"all" | "positive" | "critical">("all")

  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => {
      if (prev.includes(reviewId)) {
        return prev.filter((id) => id !== reviewId)
      } else {
        return [...prev, reviewId]
      }
    })
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "positive") return review.rating >= 4
    if (filter === "critical") return review.rating < 4
    return true
  })

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++
    }
  })

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#295A43] dark:text-white mb-6">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-[#295A43]">
          <div className="flex items-center mb-4">
            <div className="text-3xl font-bold text-[#295A43] dark:text-white mr-2">{averageRating.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-[#FDBE02] text-[#FDBE02]"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Based on {reviews.length} reviews</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-[#295A43]">
          <h3 className="font-medium text-[#295A43] dark:text-white mb-3">Rating Distribution</h3>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <div className="w-10 text-sm text-gray-600 dark:text-gray-300">{rating} star</div>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-[#FDBE02] h-2 rounded-full"
                  style={{
                    width: `${reviews.length > 0 ? (ratingCounts[rating - 1] / reviews.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <div className="w-8 text-right text-sm text-gray-600 dark:text-gray-300">{ratingCounts[rating - 1]}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center dark:bg-[#295A43]">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">Share your experience with this product</p>
          <Button onClick={() => setShowReviewForm(true)} className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
            Write a Review
          </Button>
        </div>
      </div>

      {showReviewForm && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <ReviewForm productId={productId} onClose={() => setShowReviewForm(false)} />
        </motion.div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-[#FDBE02] text-[#295A43]" : ""}
        >
          All Reviews
        </Button>
        <Button
          variant={filter === "positive" ? "default" : "outline"}
          onClick={() => setFilter("positive")}
          className={filter === "positive" ? "bg-[#FDBE02] text-[#295A43]" : ""}
        >
          Positive (4-5 ★)
        </Button>
        <Button
          variant={filter === "critical" ? "default" : "outline"}
          onClick={() => setFilter("critical")}
          className={filter === "critical" ? "bg-[#FDBE02] text-[#295A43]" : ""}
        >
          Critical (1-3 ★)
        </Button>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg dark:bg-[#1D3F2F]">
          <p className="text-gray-600 dark:text-gray-300">No reviews match your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md dark:bg-[#295A43]"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-[#295A43] dark:text-white">{review.userName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "fill-[#FDBE02] text-[#FDBE02]"
                          : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {review.verified && (
                <div className="flex items-center text-green-600 text-sm mb-2 dark:text-green-400">
                  <Check className="w-4 h-4 mr-1" />
                  Verified Purchase
                </div>
              )}

              <p className="text-gray-700 mb-4 dark:text-gray-300">{review.comment}</p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center text-sm ${
                    helpfulReviews.includes(review.id)
                      ? "text-[#FDBE02]"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({helpfulReviews.includes(review.id) ? review.helpful + 1 : review.helpful})
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400">Report</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
