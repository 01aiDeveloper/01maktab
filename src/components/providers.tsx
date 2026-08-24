"use client"

import StoreProvider from "@/providers/StoreProvider"
import TanstackQueryProvider from "@/providers/TanstackQueryProvider"
import NotificationStreamProvider from "@/providers/NotificationStreamProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <NotificationStreamProvider>{children}</NotificationStreamProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  )
}
