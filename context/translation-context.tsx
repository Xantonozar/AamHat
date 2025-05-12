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
  },
  es: {
    home: "Inicio",
    mangoes: "Mangos",
    about: "Acerca de",
    contact: "Contacto",
    cart: "Carrito",
    wishlist: "Favoritos",
    buyNow: "Comprar Ahora",
    shopNow: "Comprar Ahora",
    addToCart: "Añadir al Carrito",
    moveToCart: "Mover al Carrito",
    removeFromWishlist: "Quitar de Favoritos",
    addToWishlist: "Añadir a Favoritos",
    emptyCart: "Tu Carrito está Vacío",
    emptyWishlist: "Tu Lista de Favoritos está Vacía",
    continueShopping: "Continuar Comprando",
    checkout: "Finalizar Compra",
    total: "Total",
    subtotal: "Subtotal",
    shipping: "Envío",
    quantity: "Cantidad",
    price: "Precio",
    category: "Categoría",
    origin: "Origen",
    sortBy: "Ordenar Por",
    priceRange: "Rango de Precio",
    filters: "Filtros",
    showFilters: "Mostrar Filtros",
    hideFilters: "Ocultar Filtros",
    haveAMango: "Llévate un Mango para el Camino.",
    premiumMangoes: "Mangos premium entregados frescos a tu puerta",
    whyChooseUs: "Por Qué Elegirnos",
    featuredMangoes: "Mangos Destacados",
    handpickedSelection: "Selección cuidadosa de nuestras mejores variedades",
    viewAllMangoes: "Ver Todos los Mangos",
    exploreMangoes: "Explora Nuestros Mangos",
    discoverMangoes: "Descubre nuestra selección premium de mangos provenientes de las mejores granjas del mundo.",
    getInTouch: "Contáctanos",
    haveQuestions: "¿Tienes preguntas? ¡Nos encantaría saber de ti!",
    yourName: "Tu Nombre",
    yourEmail: "Tu Email",
    subject: "Asunto",
    yourMessage: "Tu Mensaje",
    sendMessage: "Enviar Mensaje",
    premiumQuality: "Calidad Premium",
    fastDelivery: "Entrega Rápida",
    sustainablePractices: "Prácticas Sostenibles",
    premiumQualityDesc:
      "Obtenemos solo los mejores mangos de granjas confiables, asegurando calidad premium en cada bocado.",
    fastDeliveryDesc: "De la granja a tu puerta en 24 horas, garantizando máxima frescura.",
    sustainablePracticesDesc:
      "Nos asociamos con granjas que utilizan prácticas agrícolas sostenibles para proteger nuestro medio ambiente.",
    orderSummary: "Resumen del Pedido",
    proceedToCheckout: "Proceder al Pago",
    processing: "Procesando...",
    youMayAlsoLike: "También Te Puede Gustar",
    noProductsFound: "No se encontraron productos",
    tryAdjustingFilters: "Intenta ajustar tus filtros",
    default: "Predeterminado",
    priceLowToHigh: "Precio: Menor a Mayor",
    priceHighToLow: "Precio: Mayor a Menor",
    nameAToZ: "Nombre: A a Z",
    nameZToA: "Nombre: Z a A",
    recipes: "Recetas",
  },
}

type Locale = "en" | "es"
type TranslationKey = keyof typeof languages.en

interface TranslationContextType {
  t: (key: TranslationKey) => string
  locale: Locale
  setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  // Load locale from localStorage on initial render
  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") as Locale | null
    if (storedLocale && (storedLocale === "en" || storedLocale === "es")) {
      setLocale(storedLocale)
    }
  }, [])

  // Save locale to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("locale", locale)
  }, [locale])

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
