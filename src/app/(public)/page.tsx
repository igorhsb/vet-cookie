import { Header } from "./_components/header"
import { InfoPanel } from "./_components/infoPanel"

export default function Home() {
  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      <InfoPanel />
    </div>
  )
}