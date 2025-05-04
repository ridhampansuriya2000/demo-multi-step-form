import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FormProvider } from "@/context/form-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BEYOND - Multi-Step Form",
  description: "Multi-step form application for BEYOND",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  )
}
