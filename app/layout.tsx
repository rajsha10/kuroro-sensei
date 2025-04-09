import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import OCConnectWrapper from '@/components/OCConnectWrapper'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kuroro - AI Sensei Learning Platform",
  description: "Begin your path to satori. Build a Sensei. Learn in peace.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const opts = {
    clientId: '<Does_Not_Matter_For_Sandbox_mode>',    
    redirectUri: 'http://localhost:3000/redirect', // Adjust this URL
    referralCode: 'EDUCHAIN', // Assign partner code
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <CherryBlossoms />
            {children}
          </ThemeProvider>
        </OCConnectWrapper>
      </body>
    </html>
  )
}


import './globals.css'