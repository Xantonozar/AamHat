"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Apple, BookOpen, Info, Mail, ShoppingCart, Heart, User, X, Sun, Moon, Menu, Globe } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useTranslation } from "@/context/translation-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showLanguageOptions, setShowLanguageOptions] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { t, locale, setLocale } = useTranslation()
  const { theme, setTheme } = useTheme()

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navLinks = [
    { href: "/", label: t("home"), icon: <Home className="h-5 w-5" /> },
    { href: "/mangoes", label: t("mangoes"), icon: <Apple className="h-5 w-5" /> },
    { href: "/recipes", label: t("recipes"), icon: <BookOpen className="h-5 w-5" /> },
    { href: "/about", label: t("about"), icon: <Info className="h-5 w-5" /> },
    { href: "/contact", label: t("contact"), icon: <Mail className="h-5 w-5" /> },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark")
    }
  }

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions)
  }

  const changeLanguage = (newLocale: "en" | "bn") => {
    setLocale(newLocale)
    setShowLanguageOptions(false)
  }

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="relative z-50 text-[#295A43] dark:text-white md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-xl dark:bg-[#1a3528] dark:text-white"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                <Link href="/" className="text-xl font-bold text-[#295A43] dark:text-white">
                  আম<span className="text-[#FDBE02]">GO</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-[#295A43] dark:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center rounded-lg p-3 transition-colors ${
                          pathname === link.href
                            ? "bg-[#FDBE02]/10 text-[#FDBE02]"
                            : "text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                        }`}
                      >
                        <span className="mr-3">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <Link
                    href="/wishlist"
                    className="mb-2 flex items-center justify-between rounded-lg p-3 text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                  >
                    <div className="flex items-center">
                      <Heart className="mr-3 h-5 w-5" />
                      <span>{t("wishlist")}</span>
                    </div>
                    {wishlistItems.length > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FDBE02] text-xs font-bold text-[#295A43]">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/cart"
                    className="mb-2 flex items-center justify-between rounded-lg p-3 text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="mr-3 h-5 w-5" />
                      <span>{t("cart")}</span>
                    </div>
                    {cartItems.length > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FDBE02] text-xs font-bold text-[#295A43]">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center rounded-lg p-3 text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>{t("profile")}</span>
                  </Link>
                </div>
              </nav>

              {/* Footer with Theme Toggle and Language Switcher */}
              <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <div className="mb-4">
                  <button
                    onClick={toggleTheme}
                    className="flex w-full items-center rounded-lg p-2 text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                  >
                    {mounted && theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-5 w-5 text-yellow-400" />
                        <span>{t("light_mode")}</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-5 w-5" />
                        <span>{t("dark_mode")}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={toggleLanguageOptions}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                    aria-expanded={showLanguageOptions}
                    aria-haspopup="true"
                  >
                    <div className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      <span>{t("language")}</span>
                    </div>
                    <span className="flex h-6 items-center justify-center rounded-md bg-[#FDBE02]/20 px-2 text-xs font-medium text-[#295A43] dark:bg-[#FDBE02]/30 dark:text-white">
                      {locale === "en" ? "EN" : "বাং"}
                    </span>
                  </button>

                  {showLanguageOptions && (
                    <div className="absolute left-0 right-0 mt-1 rounded-md bg-white shadow-lg dark:bg-[#1a3528]">
                      <div className="py-1">
                        <button
                          onClick={() => changeLanguage("en")}
                          className={`flex w-full items-center justify-between px-4 py-2 text-sm ${
                            locale === "en"
                              ? "bg-[#FDBE02]/10 text-[#FDBE02]"
                              : "text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                          }`}
                        >
                          <span>English</span>
                          {locale === "en" && <span className="ml-2 h-2 w-2 rounded-full bg-[#FDBE02]"></span>}
                        </button>
                        <button
                          onClick={() => changeLanguage("bn")}
                          className={`flex w-full items-center justify-between px-4 py-2 text-sm ${
                            locale === "bn"
                              ? "bg-[#FDBE02]/10 text-[#FDBE02]"
                              : "text-[#295A43] hover:bg-gray-100 dark:text-white dark:hover:bg-[#295A43]/30"
                          }`}
                        >
                          <span>বাংলা</span>
                          {locale === "bn" && <span className="ml-2 h-2 w-2 rounded-full bg-[#FDBE02]"></span>}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
