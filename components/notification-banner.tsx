"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Facebook, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNotification } from "@/context/notification-context"

interface NotificationBannerProps {
  className?: string
  showOnCheckoutOnly?: boolean
}

export function NotificationBanner({ className = "", showOnCheckoutOnly = false }: NotificationBannerProps) {
  const { showNotification, notificationMessage, notificationType, dismissNotification } = useNotification()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // If showOnCheckoutOnly is true, only show on checkout pages
    if (showOnCheckoutOnly) {
      const isCheckoutPage =
        window.location.pathname.includes("/checkout") || window.location.pathname.includes("/cart")
      setIsVisible(showNotification && isCheckoutPage)
    } else {
      setIsVisible(showNotification)
    }
  }, [showNotification, showOnCheckoutOnly])

  if (!isVisible) return null

  const bgColor =
    notificationType === "warning"
      ? "bg-amber-50 dark:bg-amber-900/30"
      : notificationType === "error"
        ? "bg-red-50 dark:bg-red-900/30"
        : notificationType === "success"
          ? "bg-green-50 dark:bg-green-900/30"
          : "bg-blue-50 dark:bg-blue-900/30"

  const borderColor =
    notificationType === "warning"
      ? "border-amber-200 dark:border-amber-800"
      : notificationType === "error"
        ? "border-red-200 dark:border-red-800"
        : notificationType === "success"
          ? "border-green-200 dark:border-green-800"
          : "border-blue-200 dark:border-blue-800"

  const textColor =
    notificationType === "warning"
      ? "text-amber-800 dark:text-amber-200"
      : notificationType === "error"
        ? "text-red-800 dark:text-red-200"
        : notificationType === "success"
          ? "text-green-800 dark:text-green-200"
          : "text-blue-800 dark:text-blue-200"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-4 mb-6 rounded-md shadow-sm ${className}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{notificationMessage}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href="https://facebook.com/mangoes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-[#295A43] dark:text-white border border-[#295A43]/20 dark:border-white/20 hover:bg-[#295A43]/10 dark:hover:bg-white/10 transition-colors"
                >
                  <Facebook className="h-3.5 w-3.5 mr-1.5" />
                  Order via Facebook
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-[#295A43] dark:text-white border border-[#295A43]/20 dark:border-white/20 hover:bg-[#295A43]/10 dark:hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                  Order via WhatsApp
                </a>
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 -mt-1 -mr-1 p-1 rounded-full hover:bg-white/20 dark:hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-50 focus:ring-amber-600 dark:focus:ring-offset-amber-900 dark:focus:ring-amber-500"
              onClick={dismissNotification}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
