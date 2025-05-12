"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, Menu, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useTranslation } from "@/context/translation-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { t, locale } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("mangoes"), path: "/mangoes" },
    { name: t("recipes"), path: "/recipes" },
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2 dark:bg-[#1D3F2F] dark:text-white" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? "text-[#295A43] dark:text-white" : "text-white"}`}>
              Mango<span className="text-[#FDBE02]">Market</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-lg font-medium transition-colors duration-300 ${
                  pathname === link.path
                    ? "text-[#FDBE02]"
                    : isScrolled
                      ? "text-[#295A43] hover:text-[#FDBE02] dark:text-white dark:hover:text-[#FDBE02]"
                      : "text-white hover:text-[#FDBE02]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Cart and Wishlist Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/wishlist" className="relative">
              <Heart
                className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-[#295A43] dark:text-white" : "text-white"}`}
              />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FDBE02] text-[#295A43] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart
                className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-[#295A43] dark:text-white" : "text-white"}`}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FDBE02] text-[#295A43] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X
                  className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-[#295A43] dark:text-white" : "text-white"}`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? "text-[#295A43] dark:text-white" : "text-white"}`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-[#1D3F2F] shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-lg font-medium transition-colors duration-300 ${
                      pathname === link.path
                        ? "text-[#FDBE02]"
                        : "text-[#295A43] hover:text-[#FDBE02] dark:text-white dark:hover:text-[#FDBE02]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
