"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
const languages = {
  en: {
    home: "Home",
    mangoes: "Mangoes",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    wishlist: "Wishlist",
    buyNow: "Buy Now",
    shopNow: "Shop Now",
    addToCart: "Add to Cart",
    moveToCart: "Move to Cart",
    removeFromWishlist: "Remove from Wishlist",
    addToWishlist: "Add to Wishlist",
    emptyCart: "Your Cart is Empty",
    emptyWishlist: "Your Wishlist is Empty",
    continueShopping: "Continue Shopping",
    checkout: "Checkout",
    total: "Total",
    subtotal: "Subtotal",
    shipping: "Shipping",
    quantity: "Quantity",
    price: "Price",
    category: "Category",
    origin: "Origin",
    sortBy: "Sort By",
    priceRange: "Price Range",
    filters: "Filters",
    showFilters: "Show Filters",
    hideFilters: "Hide Filters",
    haveAMango: "Have a Mango on the Go.",
    premiumMangoes: "Premium mangoes delivered fresh to your doorstep",
    whyChooseUs: "Why Choose Us",
    featuredMangoes: "Featured Mangoes",
    handpickedSelection: "Handpicked selection of our finest varieties",
    viewAllMangoes: "View All Mangoes",
    exploreMangoes: "Explore Our Mangoes",
    discoverMangoes: "Discover our premium selection of mangoes sourced from the finest farms around the world.",
    getInTouch: "Get In Touch",
    haveQuestions: "Have questions? We'd love to hear from you!",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    sendMessage: "Send Message",
    premiumQuality: "Premium Quality",
    fastDelivery: "Fast Delivery",
    sustainablePractices: "Sustainable Practices",
    premiumQualityDesc: "We source only the finest mangoes from trusted farms, ensuring premium quality in every bite.",
    fastDeliveryDesc: "From farm to your doorstep within 24 hours, ensuring maximum freshness.",
    sustainablePracticesDesc:
      "We partner with farms that use sustainable farming practices to protect our environment.",
    orderSummary: "Order Summary",
    proceedToCheckout: "Proceed to Checkout",
    processing: "Processing...",
    youMayAlsoLike: "You May Also Like",
    noProductsFound: "No products found",
    tryAdjustingFilters: "Try adjusting your filters",
    default: "Default",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    nameAToZ: "Name: A to Z",
    nameZToA: "Name: Z to A",
    recipes: "Recipes",
    profile: "Profile",
    light_mode: "Light Mode",
    dark_mode: "Dark Mode",
    language: "Language",
    english: "English",
    bangla: "Bangla",
    currentLanguage: "Current Language",
    // Add error page translations
    tryAgain: "Try Again",
    backToHome: "Back to Home",
    oops: "Oops!",
    somethingWentWrong: "Something went wrong",
    apologize: "We apologize for the inconvenience. Please try again or return to the homepage.",
  },
  bn: {
    home: "হোম",
    mangoes: "আম",
    about: "আমাদের সম্পর্কে",
    contact: "যোগাযোগ",
    cart: "কার্ট",
    wishlist: "ইচ্ছেতালিকা",
    buyNow: "এখনই কিনুন",
    shopNow: "এখনই কেনাকাটা করুন",
    addToCart: "কার্টে যোগ করুন",
    moveToCart: "কার্টে সরান",
    removeFromWishlist: "ইচ্ছেতালিকা থেকে সরান",
    addToWishlist: "ইচ্ছেতালিকায় যোগ করুন",
    emptyCart: "আপনার কার্ট খালি",
    emptyWishlist: "আপনার ইচ্ছেতালিকা খালি",
    continueShopping: "কেনাকাটা চালিয়ে যান",
    checkout: "চেকআউট",
    total: "মোট",
    subtotal: "উপমোট",
    shipping: "শিপিং",
    quantity: "পরিমাণ",
    price: "মূল্য",
    category: "বিভাগ",
    origin: "উৎপত্তি",
    sortBy: "সাজান",
    priceRange: "মূল্য পরিসীমা",
    filters: "ফিল্টার",
    showFilters: "ফিল্টার দেখান",
    hideFilters: "ফিল্টার লুকান",
    haveAMango: "চলার পথে একটি আম খান।",
    premiumMangoes: "প্রিমিয়াম আম সরাসরি আপনার দরজায়",
    whyChooseUs: "আমাদের কেন বেছে নেবেন",
    featuredMangoes: "বিশেষ আম",
    handpickedSelection: "আমাদের সেরা প্রজাতির হাতে বাছাই করা নির্বাচন",
    viewAllMangoes: "সব আম দেখুন",
    exploreMangoes: "আমাদের আম অন্বেষণ করুন",
    discoverMangoes: "বিশ্বের সেরা খামার থেকে সংগ্রহ করা আমাদের প্রিমিয়াম আম আবিষ্কার করুন।",
    getInTouch: "যোগাযোগ করুন",
    haveQuestions: "প্রশ্ন আছে? আমরা আপনার কথা শুনতে চাই!",
    yourName: "আপনার নাম",
    yourEmail: "আপনার ইমেইল",
    subject: "বিষয়",
    yourMessage: "আপনার বার্তা",
    sendMessage: "বার্তা পাঠান",
    premiumQuality: "প্রিমিয়াম মান",
    fastDelivery: "দ্রুত ডেলিভারি",
    sustainablePractices: "টেকসই অনুশীলন",
    premiumQualityDesc: "আমরা শুধুমাত্র বিশ্বস্ত খামার থেকে সেরা আম সংগ্রহ করি, প্রতিটি কামড়ে প্রিমিয়াম মান নিশ্চিত করি।",
    fastDeliveryDesc: "খামার থেকে আপনার দরজায় 24 ঘন্টার মধ্যে, সর্বাধিক তাজা নিশ্চিত করে।",
    sustainablePracticesDesc: "আমরা এমন খামারের সাথে অংশীদারিত্ব করি যারা আমাদের পরিবেশ রক্ষার জন্য টেকসই কৃষি পদ্ধতি ব্যবহার করে।",
    orderSummary: "অর্ডার সারাংশ",
    proceedToCheckout: "চেকআউট করুন",
    processing: "প্রক্রিয়াকরণ হচ্ছে...",
    youMayAlsoLike: "আপনি এগুলিও পছন্দ করতে পারেন",
    noProductsFound: "কোন পণ্য পাওয়া যায়নি",
    tryAdjustingFilters: "আপনার ফিল্টার সামঞ্জস্য করার চেষ্টা করুন",
    default: "ডিফল্ট",
    priceLowToHigh: "মূল্য: কম থেকে বেশি",
    priceHighToLow: "মূল্য: বেশি থেকে কম",
    nameAToZ: "নাম: A থেকে Z",
    nameZToA: "নাম: Z থেকে A",
    recipes: "রেসিপি",
    profile: "প্রোফাইল",
    light_mode: "লাইট মোড",
    dark_mode: "ডার্ক মোড",
    language: "ভাষা",
    english: "ইংরেজি",
    bangla: "বাংলা",
    currentLanguage: "বর্তমান ভাষা",
    // Add error page translations
    tryAgain: "আবার চেষ্টা করুন",
    backToHome: "হোমে ফিরে যান",
    oops: "উফ!",
    somethingWentWrong: "কিছু ভুল হয়েছে",
    apologize: "অসুবিধার জন্য আমরা দুঃখিত। অনুগ্রহ করে আবার চেষ্টা করুন বা হোমপেজে ফিরে যান।",
  },
}

type Locale = "en" | "bn"
type TranslationKey = keyof typeof languages.en

interface TranslationContextType {
  t: (key: TranslationKey) => string
  locale: Locale
  setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [locale, setLocale] = useState<Locale>("en")

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load locale from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocale = localStorage.getItem("locale") as Locale | null
      if (storedLocale && (storedLocale === "en" || storedLocale === "bn")) {
        setLocale(storedLocale)
      }
    }
  }, [])

  // Save locale to localStorage whenever it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("locale", locale)
    }
  }, [locale, mounted])

  const t = (key: TranslationKey): string => {
    return languages[locale][key] || key
  }

  return (
    <TranslationContext.Provider
      value={{
        t,
        locale,
        setLocale,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
