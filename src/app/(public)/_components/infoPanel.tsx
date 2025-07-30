import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from "../../../../public/doctor-hero.png"

export function InfoPanel() {
    return (
        <section className="pb-2">
            <div className="container mx-auto px-4 sm:pb-0 pt-20 pb-3 sm:px-6 lg:px-8">
                <main className="flex items-center justify-center">
                    <article className="space-y-8 max-w-3xl flex flex-col justify-center flex-[2]">
                        <h1 className="text-3xl lg:text-5xl font-bold max-w-2xl tracking-tight">
                            Encontre os melhores profissionais e serviços em um
                            único local!
                        </h1>
                        <p className="text-base md:text-lg text-gray-600">
                            Nós somos uma plataforma para profissionais da
                            veterinária com foco em agilizar seu atendimento de
                            forma simplificada e organizada.
                        </p>
                        <Button className="bg-emerald-500 hover:bg-emerald-900 w-fit px-6 font-semibold">
                            Clínicas disponíveis
                        </Button>
                    </article>
                    <div className="hidden lg:block">
                        <Image 
                            src={doctorImage}
                            alt="doctor"
                            width={340}
                            height={400}
                            className="object-contain"
                            quality={100}
                            priority
                        />
                    </div>
                </main>
            </div>
        </section>
    );
}
