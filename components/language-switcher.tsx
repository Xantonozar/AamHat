"use client"

import { useTranslation } from "@/context/translation-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <div>
      {locale === "en" ? (
        <Button variant="ghost" size="sm" onClick={() => setLocale("es")} className="text-[#295A43] dark:text-white">
          ES
        </Button>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setLocale("en")} className="text-[#295A43] dark:text-white">
          EN
        </Button>
      )}
    </div>
  )
}
