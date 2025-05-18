"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/context/translation-context"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  const { t } = useTranslation()

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }

        slider.on("created", () => {
          nextTimeout()
        })

        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)

        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })

        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
      },
    ],
  )

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div ref={sliderRef} className="keen-slider h-[70vh] md:h-[80vh]">
          <div className="keen-slider__slide relative">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Fresh Mangoes"
              fill
              className="object-cover brightness-[0.85]"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("haveAMango")}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 text-center max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("premiumMangoes")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  size="lg"
                  className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {t("shopNow")}
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="keen-slider__slide relative">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Mango Varieties"
              fill
              className="object-cover brightness-[0.85]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Discover Premium Varieties</h1>
              <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
                From Himsagar to Amropali, explore the finest mangoes
              </p>
              <Button
                size="lg"
                className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Explore Varieties
              </Button>
            </div>
          </div>
          <div className="keen-slider__slide relative">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Farm Fresh Mangoes"
              fill
              className="object-cover brightness-[0.85]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Farm to Door Freshness</h1>
              <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">Handpicked and delivered within 24 hours</p>
              <Button
                size="lg"
                className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Section */}
      <section className="py-16 px-4 bg-[#FFF8B0] dark:bg-[#295A43]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title dark:text-white">{t("whyChooseUs")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md text-center dark:bg-[#1D3F2F] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-[#FDBE02] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#295A43]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-[#FDBE02]">{t("premiumQuality")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("premiumQualityDesc")}</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md text-center dark:bg-[#1D3F2F] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-[#FDBE02] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#295A43]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-[#FDBE02]">{t("fastDelivery")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("fastDeliveryDesc")}</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md text-center dark:bg-[#1D3F2F] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-[#FDBE02] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#295A43]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-[#FDBE02]">{t("sustainablePractices")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("sustainablePracticesDesc")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 dark:bg-[#1D3F2F] dark:text-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title dark:text-white">{t("getInTouch")}</h2>
            <p className="section-subtitle dark:text-gray-300">{t("haveQuestions")}</p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg dark:bg-[#295A43]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                    placeholder={t("yourName")}
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                    placeholder={t("yourEmail")}
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                  placeholder={t("subject")}
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                  placeholder={t("yourMessage")}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {t("sendMessage")}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}