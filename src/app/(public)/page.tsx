import { Header } from "./_components/header"
import { InfoPanel } from "./_components/infoPanel"
import { ClinicsPanel } from "./_components/clinics"
import { Footer } from "./_components/footer"
import { getProfessionals } from "./_data-access/get-professionals"

export default async function Home() {
  const professionals = await getProfessionals();

  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      <InfoPanel />
      <ClinicsPanel professionals={professionals || []}/>
      <Footer/>
    </div>
  )
}