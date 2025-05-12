"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/context/translation-context"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-[#1D3F2F]">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-[#FDBE02]">Oops!</h1>
          <h2 className="text-3xl font-bold mt-4 mb-6 text-[#295A43] dark:text-white">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We apologize for the inconvenience. Please try again or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-[#295A43] hover:bg-[#1D3F2F] text-white dark:bg-[#FDBE02] dark:hover:bg-[#FFA94D] dark:text-[#295A43]"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-[#295A43] text-[#295A43] dark:border-white dark:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
