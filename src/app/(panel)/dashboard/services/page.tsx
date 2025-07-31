import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Services() {
    const session = await getSession();

    if (!session) {
        redirect('/');
    }

    return (
        <div>
            <h1>Services</h1>
        </div>
    );
}
