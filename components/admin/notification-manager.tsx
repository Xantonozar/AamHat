"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useNotification } from "@/context/notification-context"

export function NotificationManager() {
  const { showNotification, notificationMessage, notificationType, setNotification } = useNotification()
  const [message, setMessage] = useState(notificationMessage)
  const [type, setType] = useState(notificationType)
  const [isEnabled, setIsEnabled] = useState(showNotification)
  const [facebookLink, setFacebookLink] = useState("https://facebook.com/mangoes")
  const [whatsappNumber, setWhatsappNumber] = useState("1234567890")

  const handleSave = () => {
    setNotification(isEnabled, message, type)
    // In a real application, you would also save these settings to a database
    alert("Notification settings saved!")
  }

  return (
    <div className="bg-white dark:bg-[#295A43] rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-[#295A43] dark:text-white">Notification Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="notification-enabled" className="text-[#295A43] dark:text-white">
            Enable Checkout Notification
          </Label>
          <Switch id="notification-enabled" checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification-message" className="text-[#295A43] dark:text-white">
            Notification Message
          </Label>
          <Textarea
            id="notification-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full"
            placeholder="Enter notification message"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification-type" className="text-[#295A43] dark:text-white">
            Notification Type
          </Label>
          <select
            id="notification-type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full p-2 border rounded-md dark:bg-[#1D3F2F] dark:border-gray-700 dark:text-white"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebook-link" className="text-[#295A43] dark:text-white">
            Facebook Page URL
          </Label>
          <Input
            id="facebook-link"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
            className="w-full"
            placeholder="Enter Facebook page URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp-number" className="text-[#295A43] dark:text-white">
            WhatsApp Number
          </Label>
          <Input
            id="whatsapp-number"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full"
            placeholder="Enter WhatsApp number"
          />
        </div>

        <Button onClick={handleSave} className="w-full bg-[#FDBE02] hover:bg-[#FFA94D] text-[#295A43] font-bold py-3">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
