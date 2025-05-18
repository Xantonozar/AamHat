"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Heart, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Sidebar } from "@/components/sidebar"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useTranslation } from "@/context/translation-context"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { t } = useTranslation()

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
    { href: "/", label: t("home") },
    { href: "/mangoes", label: t("mangoes") },
    { href: "/recipes", label: t("recipes") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2 dark:bg-[#1a3528] dark:shadow-[#0a1a14]" : "bg-transparent py-3 sm:py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Sidebar for mobile */}
            <div className="md:hidden">
              <Sidebar />
            </div>

            <Link href="/" className="flex items-center ml-2 md:ml-0">
              <span
                className={`text-xl sm:text-2xl font-bold ${isScrolled ? "text-[#295A43] dark:text-white" : "text-[#295A43] dark:text-white"}`}
              >
                Mango<span className="text-[#FDBE02]">Market</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base lg:text-lg font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#FDBE02]"
                    : isScrolled
                      ? "text-[#295A43] hover:text-[#FDBE02] dark:text-white dark:hover:text-[#FDBE02]"
                      : "text-[#295A43] hover:text-[#FDBE02] dark:text-white dark:hover:text-[#FDBE02]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart, Wishlist, Theme Toggle, Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/search">
              <Button variant="ghost" size="icon" className="text-[#295A43] dark:text-white">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="icon" className="text-[#295A43] dark:text-white">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FDBE02] text-[#295A43] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-[#295A43] dark:text-white">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FDBE02] text-[#295A43] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
