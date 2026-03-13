import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Плодородие-Агро — Сельхозтехника и запчасти | Культиваторы, плуги, бороны, сеялки",
    template: "%s | Плодородие-Агро",
  },
  description:
    "ООО «Плодородие-Агро» — поставщик сельскохозяйственной навесной и прицепной техники. Запчасти для культиваторов, плугов, борон, сеялок, опрыскивателей. Доставка по всей России. Курск.",
  keywords: [
    "плодородие агро",
    "запчасти для сельхозтехники",
    "сельскохозяйственная техника курск",
    "запчасти культиваторы",
    "запчасти плуги",
    "запчасти бороны",
    "запчасти сеялки",
    "навесная техника",
    "прицепная техника",
    "запчасти опрыскиватели",
    "купить сельхозтехнику",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Плодородие-Агро",
    title: "Плодородие-Агро — Сельхозтехника и запчасти",
    description:
      "ООО «Плодородие-Агро» — надёжный поставщик сельскохозяйственной техники с 2009 года. Доставка по всей России.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
