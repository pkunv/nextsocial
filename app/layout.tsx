import type { Metadata } from "next"
import { Inter } from "next/font/google"
import NavMenu from "./NavMenu"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NEXTsocial",
  description: "Simple social media app"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-base-100 grid place-items-center "}>
        <div className="w-5/6">
          <NavMenu />
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  )
}
