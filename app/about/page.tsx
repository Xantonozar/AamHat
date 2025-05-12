"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslation } from "@/context/translation-context"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="dark:bg-[#1D3F2F] dark:text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Mango Farm"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Mango Market
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bringing the finest mangoes from farm to your doorstep
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#295A43] dark:text-white">Our Story</h2>
            <div className="w-24 h-1 bg-[#FDBE02] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image src="/placeholder.svg?height=800&width=600" alt="Mango Farmers" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-[#295A43] dark:text-white">From Humble Beginnings</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Mango Market started in 2015 with a simple mission: to bring the finest mangoes directly from farms to
                consumers, cutting out middlemen and ensuring farmers get fair prices for their produce.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                What began as a small operation with just three varieties of mangoes has now grown into a thriving
                marketplace offering over 20 premium varieties from the best mango-growing regions around the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4 bg-[#FFF8B0] dark:bg-[#295A43]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#295A43] dark:text-white">Our Mission</h2>
            <div className="w-24 h-1 bg-[#FDBE02] mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg dark:bg-[#1D3F2F]"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-[#FDBE02]">Quality First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We never compromise on quality. Every mango is handpicked and carefully inspected before being shipped
                  to your doorstep.
                </p>
              </div>
              <div className="text-center">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-[#FDBE02]">Supporting Farmers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We work directly with farmers, ensuring they receive fair compensation for their hard work and
                  exceptional produce.
                </p>
              </div>
              <div className="text-center">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-[#FDBE02]">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We're committed to sustainable farming practices and eco-friendly packaging to minimize our
                  environmental footprint.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#295A43] dark:text-white">Meet Our Team</h2>
            <div className="w-24 h-1 bg-[#FDBE02] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Founder & CEO", image: "/placeholder.svg?height=400&width=400" },
              { name: "Jane Smith", role: "Head of Operations", image: "/placeholder.svg?height=400&width=400" },
              { name: "Mike Johnson", role: "Chief Mango Officer", image: "/placeholder.svg?height=400&width=400" },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden text-center dark:bg-[#295A43]"
              >
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#295A43] dark:text-white">{member.name}</h3>
                  <p className="text-[#FFA94D]">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
