"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type NotificationType = "info" | "warning" | "error" | "success"

interface NotificationContextType {
  showNotification: boolean
  notificationMessage: string
  notificationType: NotificationType
  setNotification: (show: boolean, message: string, type: NotificationType) => void
  dismissNotification: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState<NotificationType>("info")

  // Check if online ordering is available from localStorage or API
  useEffect(() => {
    // This could be fetched from an API in a real application
    const isOnlineOrderingAvailable = false

    if (!isOnlineOrderingAvailable) {
      setShowNotification(true)
      setNotificationMessage(
        "Online ordering is currently unavailable. Please place your order via Facebook or WhatsApp.",
      )
      setNotificationType("warning")
    }
  }, [])

  const setNotification = (show: boolean, message: string, type: NotificationType) => {
    setShowNotification(show)
    setNotificationMessage(message)
    setNotificationType(type)
  }

  const dismissNotification = () => {
    setShowNotification(false)
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        notificationMessage,
        notificationType,
        setNotification,
        dismissNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
