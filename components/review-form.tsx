"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReviewFormProps {
  productId: string
  onClose: () => void
}

export function ReviewForm({ productId, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"
    if (!comment.trim()) newErrors.comment = "Review comment is required"
    if (rating === 0) newErrors.rating = "Please select a rating"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call to submit review
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds and close
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-[#295A43]">
        <h3 className="text-xl font-bold text-[#295A43] dark:text-white mb-4">Thank You!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your review has been submitted successfully and will be published after moderation.
        </p>
        <Button onClick={onClose} className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
          Close
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-[#295A43]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#295A43] dark:text-white">Write a Review</h3>
        <Button variant="outline" onClick={onClose} className="dark:border-gray-600 dark:text-white">
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="rating" className="block mb-2">
            Rating <span className="text-red-500">*</span>
          </Label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? "fill-[#FDBE02] text-[#FDBE02]"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        <div>
          <Label htmlFor="name" className="block mb-2">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="block mb-2">
            Email <span className="text-red-500">*</span> <span className="text-sm text-gray-500">(Not published)</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="comment" className="block mb-2">
            Review <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="comment"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={errors.comment ? "border-red-500" : ""}
            placeholder="Share your experience with this product..."
          />
          {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  )
}
