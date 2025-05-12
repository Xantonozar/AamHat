"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/context/translation-context"

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-[#1D3F2F]">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-[#FDBE02]">404</h1>
          <h2 className="text-3xl font-bold mt-4 mb-6 text-[#295A43] dark:text-white">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
