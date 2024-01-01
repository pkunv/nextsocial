import ToastContainerWrapper from "@/components/ToastContainerWrapper"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AuthProvider from "./AuthProvider"
import NavMenu from "./NavMenu"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NEXTsocial",
  description: "Simple social media app"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className + " bg-base-100 grid place-items-center "}>
          <div className="w-5/6">
            <ToastContainerWrapper />
            <NavMenu />
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}
