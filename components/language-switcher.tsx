"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "@/context/translation-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (newLocale: "en" | "bn") => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-[#295A43] dark:text-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" />
        <span className="ml-1">{locale === "en" ? "EN" : "বাং"}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md bg-white shadow-lg dark:bg-[#1a3528]">
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
  )
}
