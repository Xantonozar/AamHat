import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { TranslationProvider } from "@/context/translation-context"
import { CheckoutProvider } from "@/context/checkout-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mango Market | Fresh Mangoes Delivered",
  description: "Premium mangoes delivered fresh to your doorstep",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TranslationProvider>
            <CartProvider>
              <WishlistProvider>
                <CheckoutProvider>
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                  <footer className="bg-[#295A43] text-white py-6 sm:py-8 dark:bg-[#1D3F2F]">
                    <div className="container mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="px-4">
                          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Mango Market</h3>
                          <p className="text-sm sm:text-base">Have a Mango on the Go.</p>
                        </div>
                        <div className="px-4">
                          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</h3>
                          <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                            <li>Home</li>
                            <li>Mangoes</li>
                            <li>About Us</li>
                            <li>Contact</li>
                          </ul>
                        </div>
                        <div className="px-4 sm:col-span-2 md:col-span-1">
                          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact Us</h3>
                          <address className="not-italic text-sm sm:text-base">
                            <p>123 Mango Lane</p>
                            <p>Fruit City, FC 12345</p>
                            <p>info@mangomarket.com</p>
                          </address>
                        </div>
                      </div>
                      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#A7D46F] text-center px-4">
                        <p className="text-sm sm:text-base">
                          © {new Date().getFullYear()} Mango Market. All rights reserved.
                        </p>
                      </div>
                    </div>
                  </footer>
                </CheckoutProvider>
              </WishlistProvider>
            </CartProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
