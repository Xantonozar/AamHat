"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/context/translation-context"

export default function ContactPage() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="dark:bg-[#1D3F2F] dark:text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0 bg-[#295A43] dark:bg-[#1D3F2F]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t("getInTouch")}
            </motion.h1>
            <motion.p
              className="text-xl text-white max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("haveQuestions")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center dark:bg-[#295A43]"
            >
              <div className="w-16 h-16 bg-[#FDBE02] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#295A43]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-white">Our Location</h3>
              <p className="text-gray-600 dark:text-gray-300">123 Mango Lane</p>
              <p className="text-gray-600 dark:text-gray-300">Fruit City, FC 12345</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center dark:bg-[#295A43]"
            >
              <div className="w-16 h-16 bg-[#FDBE02] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-[#295A43]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-white">Phone Number</h3>
              <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9am - 5pm</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center dark:bg-[#295A43]"
            >
              <div className="w-16 h-16 bg-[#FDBE02] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#295A43]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#295A43] dark:text-white">Email Address</h3>
              <p className="text-gray-600 dark:text-gray-300">info@mangomarket.com</p>
              <p className="text-gray-600 dark:text-gray-300">support@mangomarket.com</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto dark:bg-[#295A43]"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#295A43] dark:text-white">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-900 dark:text-green-100">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                      placeholder={t("yourName")}
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
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
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                    placeholder={t("subject")}
                    required
                  />
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDBE02] focus:border-transparent transition-all duration-300 dark:bg-[#1D3F2F] dark:border-gray-600 dark:text-white"
                    placeholder={t("yourMessage")}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("sendMessage")}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-[#FFF8B0] dark:bg-[#295A43]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#295A43] dark:text-white">Find Us</h2>
            <div className="w-24 h-1 bg-[#FDBE02] mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-96 dark:bg-[#1D3F2F]"
          >
            {/* Placeholder for map */}
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Map Placeholder</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
