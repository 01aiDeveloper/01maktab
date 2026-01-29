
import  GuestHomePage  from "@/components/pages/guesthome"
import  PrivateHomePage  from "@/components/pages/userhome"

export default function Home() {

  if (true) {
    return <GuestHomePage/>
  }
  return (
  <PrivateHomePage/>
  )
}
