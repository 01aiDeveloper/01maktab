import GuestHomePage from "@/components/pages/guesthome"
import PrivateHomePage from "@/components/pages/userhome"
import { getAuthFromCookie } from "@/lib/auth-utils"

export default async function Home() {
  const auth = await getAuthFromCookie()

  if (!auth.isAuthenticated) {
    return <GuestHomePage />
  }

  return <PrivateHomePage />
}