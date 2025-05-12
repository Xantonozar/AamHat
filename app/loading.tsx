import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-[#1D3F2F]/80 z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#FDBE02]" />
        <p className="mt-4 text-lg font-medium text-[#295A43] dark:text-white">Loading...</p>
      </div>
    </div>
  )
}
