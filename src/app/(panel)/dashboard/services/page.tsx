import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { ServiceContent } from './_components/service-content';
import { Suspense } from 'react';

export default async function Services() {
    
    const session = await getSession();

    if (!session) {
        redirect('/');
    }

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ServiceContent userId={session.user?.id}/>
        </Suspense>
    );
}
