import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Source_Code_Pro } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
})

export const metadata: Metadata = {
  title: "Caesar-Cipher 2025 | Rotaract Club Of KCE",
  description: "Join the ultimate  hackathon competition at our college. Code, compete, conquer.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${sourceCodePro.variable} antialiased`}>
      <body className="font-mono">{children}</body>
    </html>
  )
}
