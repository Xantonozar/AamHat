import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mango Market",
    short_name: "MangoMarket",
    description: "Premium mangoes delivered fresh to your doorstep",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFDF7",
    theme_color: "#FDBE02",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
