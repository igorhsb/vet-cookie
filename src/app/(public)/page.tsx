import { Header } from "./_components/header"
import { InfoPanel } from "./_components/infoPanel"
import { ClinicsPanel } from "./_components/clinics"
import { Footer } from "./_components/footer"

export default function Home() {
  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      <InfoPanel />
      <ClinicsPanel/>
      <Footer/>
    </div>
  )
}