import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import fotoImg from '../../../../public/foto1.png';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { User } from '../../../../generated/prisma';

interface ClinicsPanelProps {
    professionals: User[];
}

export function ClinicsPanel({ professionals }: ClinicsPanelProps) {
    return (
        <section className="bg-emerald-50 p-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl text-center mb-12 font-bold">
                    Clinicas disponíveis
                </h2>
            </div>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {professionals.map((clinic) => (
                    <Card className="overflow-hidden hover:shadow-lg duration-300" key={clinic.id}>
                        <CardContent className="p-0">
                            <div>
                                <div className="relative h-48">
                                    <Image
                                        src={clinic.image || fotoImg}
                                        alt="Foto clinica"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            {clinic.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {clinic.address ?? "Endereço não informado."}
                                        </p>
                                    </div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                </div>
                                <Link
                                    href={`/clinic/${clinic.id}`}
                                    target='_blank'
                                    className="bg-emerald-500 hover:bg-emerald-800 w-full text-white flex items-center justify-center py-2 rounded-md text-sm font-medium md:text-base"
                                >
                                    Agendar horário
                                    <ArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </section>
    );
}
