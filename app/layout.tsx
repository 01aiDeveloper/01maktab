import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}