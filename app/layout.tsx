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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TranslationProvider>
            <CartProvider>
              <WishlistProvider>
                <CheckoutProvider>
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                  <footer className="bg-[#295A43] text-white py-8 dark:bg-[#1D3F2F]">
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-xl font-bold mb-4">Mango Market</h3>
                          <p>Have a Mango on the Go.</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                          <ul className="space-y-2">
                            <li>Home</li>
                            <li>Mangoes</li>
                            <li>About Us</li>
                            <li>Contact</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                          <p>123 Mango Lane</p>
                          <p>Fruit City, FC 12345</p>
                          <p>info@mangomarket.com</p>
                        </div>
                      </div>
                      <div className="mt-8 pt-8 border-t border-[#A7D46F] text-center">
                        <p>© {new Date().getFullYear()} Mango Market. All rights reserved.</p>
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
