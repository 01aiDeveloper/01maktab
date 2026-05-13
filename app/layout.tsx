import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "01AI",
  description: "01AI",
  generator: "01AI",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        {/* {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Disable React DevTools
                if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
                }
                // Disable right-click context menu
                document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
                // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'F12' ||
                      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                      (e.ctrlKey && e.key === 'u')) {
                    e.preventDefault();
                  }
                });
              `,
            }}
          />
        )} */}
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
